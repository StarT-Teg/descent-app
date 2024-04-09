import {useEffect} from "react";

export interface DebounceOptionsInterface {
    debounceData: any;
    debounceDelay?: number;

    callback?(): void;
}

export const useDebounce = (options: DebounceOptionsInterface) => {
    const {
        debounceData,
        debounceDelay = 3000,
        callback,
    } = options;

    useEffect(
        () => {
            const t = setTimeout(() => {
                callback?.()
            }, debounceDelay);

            return () => {
                clearTimeout(t);
            };
        },
        [debounceData]
    );
}