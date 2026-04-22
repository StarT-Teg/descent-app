import {useEffect} from "react";
import {useQuery} from "./useQuery";
import {LOCAL_STORAGE_SAVE_KEY} from "../../shared/global-constants";

const INVITE_UUID_PARAM = 'inviteUuid';

/**
 * Detects `?inviteUuid=` query parameter on any route and persists it to
 * localStorage, replacing any previously stored UUID.
 * The parameter is removed from the URL after processing to keep it clean.
 *
 * Returns the detected inviteUuid (or null if not present in the current URL).
 */
export const useInviteUuid = (): string | null => {
    const query = useQuery();
    const inviteUuid = query.get(INVITE_UUID_PARAM);

    useEffect(() => {
        if (!inviteUuid) {
            return;
        }

        localStorage.setItem(LOCAL_STORAGE_SAVE_KEY, inviteUuid);

        // Remove the query parameter from the URL without triggering a navigation
        // so that the invite link is not bookmarked or shared by accident.
        const url = new URL(window.location.href);
        url.searchParams.delete(INVITE_UUID_PARAM);
        window.history.replaceState(null, '', url.toString());
    }, [inviteUuid]);

    return inviteUuid;
};
