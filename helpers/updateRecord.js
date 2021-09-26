import { getTimeFromOffset } from '../helpers/getTimeOffset';
import moment from 'moment';
import { getDatabase, ref, update } from '@firebase/database';





export function updateRecord(state, queryId, user) {

    return (action) => {
        const db = getDatabase();
        const curUserRef = ref(db, "sessions/" + queryId + "/users/" + user.uid)
        const timePosition = getTimeFromOffset((action.clientX - action.timeline.domRect.left - 6), action.timeline.start, action.timeline.end, action.timeline.domRect.width)
        update(curUserRef, {
            start: action.timeline.start.clone().add(timePosition - 0.5, "hours").utc().format(),
            end: action.timeline.start.clone().add(timePosition + 0.5, "hours").utc().format()
        });
        

    }
}