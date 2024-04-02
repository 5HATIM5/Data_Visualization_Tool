const whitelist: string[] = [
    'http://127.0.0.1:5173',
    'http://localhost:5173'
];

const corsOptions = {
    origin: (origin: string | undefined, callback: (error: Error | null, allow: boolean) => void) => {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    optionsSuccessStatus: 200
};

export default corsOptions;
