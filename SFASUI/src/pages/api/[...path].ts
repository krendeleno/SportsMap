import { IncomingMessage, ServerResponse } from 'http';
import httpProxy from 'http-proxy';
import { cloudApi, serviceClients, Session } from '@yandex-cloud/nodejs-sdk';
import { LogLevel_Level } from '@yandex-cloud/nodejs-sdk/dist/generated/yandex/cloud/logging/v1/log_entry';

import { getLogStatus } from 'src/client/shared/utils/logger';
import { BACKEND_FULL } from 'src/client/shared/utils/environment';

const {
    logging: {
        log_ingestion_service: { WriteRequest },
    },
} = cloudApi;

const API_URL = BACKEND_FULL;
const proxy = httpProxy.createProxyServer();
export const config = {
    api: {
        bodyParser: false,
    },
};

const createLogger = () => {
    if (!process.env.OAUTH) {
        return;
    }

    const session = new Session({ oauthToken: process.env.OAUTH });
    const loggerServiceClient = session.client(serviceClients.LogIngestionServiceClient);

    return loggerServiceClient;
};

const loggerServiceClient = createLogger();

proxy.on('error', function (err, req) {
    if (!process.env.LOG_GROUP_ID || !loggerServiceClient) {
        return;
    }

    loggerServiceClient.write(
        WriteRequest.fromPartial({
            destination: {
                logGroupId: process.env.LOG_GROUP_ID,
            },
            entries: [
                {
                    message: `${req.method} ${req.url}`,
                    timestamp: new Date(),
                    level: LogLevel_Level.ERROR,
                    jsonPayload: { error: err },
                },
            ],
        })
    );
});

proxy.on('proxyRes', function (proxyRes, req, res) {
    const bodyChunks: Uint8Array[] = [];
    proxyRes.on('data', function (chunk) {
        bodyChunks.push(chunk);
    });
    proxyRes.on('end', function () {
        const body = Buffer.concat(bodyChunks).toString();

        if (!process.env.LOG_GROUP_ID || !loggerServiceClient) {
            return;
        }

        loggerServiceClient.write(
            WriteRequest.fromPartial({
                destination: {
                    logGroupId: process.env.LOG_GROUP_ID,
                },
                entries: [
                    {
                        message: `${req.method} ${req.url} ${res.statusCode}`,
                        timestamp: new Date(),
                        level: getLogStatus(res.statusCode),
                        jsonPayload: {
                            res: body,
                            statusCode: res.statusCode,
                            reqHeaders: req.headers,
                            resHeaders: res.getHeaders(),
                        },
                    },
                ],
            })
        );
    });
});

export default async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    return await new Promise<void>((resolve, reject) => {
        req.url = req.url?.replace('/api', '');

        proxy.web(req, res, { target: API_URL, changeOrigin: true }, (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};
