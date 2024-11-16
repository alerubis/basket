import { GameEvent } from "../auto/GameEvent";

export class GameEventHelper extends GameEvent {

    override fromDbValues(values: any): GameEventHelper {
        const newGameEvent = new GameEventHelper(super.fromDbValues(values));
        return newGameEvent;
    }

    getFromTime(): number {
        let fromTime = 0;
        if (this.from_time) {
            fromTime = this.from_time;
        }
        return fromTime;
    }

    getToTime(): number {
        let toTime = 0;
        if (this.to_time) {
            toTime = this.to_time;
        } else if (this.from_time) {
            toTime = 1 + this.from_time;
        }
        return toTime;
    }

}
