export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_GOOGLE_API_KEY: string;
            REACT_APP_GOOGLE_SHEETS_ID: string;
            Local_Storage_Save_Key: string;
            ENV: 'test' | 'dev' | 'prod';
        }
    }
}