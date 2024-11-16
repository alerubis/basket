import { GameEvent } from "../auto/GameEvent";

export class GameEventHelper extends GameEvent {

    override fromDbValues(values: any): GameEventHelper {
        const newGameEvent = new GameEventHelper(super.fromDbValues(values));
        return newGameEvent;
    }

    getFromSecond(): number {
        let fromSecond = 0;
        if (this.from_second) {
            fromSecond = this.from_second;
        }
        return fromSecond;
    }

    getToSecond(): number {
        let toSecond = 0;
        if (this.to_second) {
            toSecond = this.to_second;
        } else if (this.from_second) {
            toSecond = 1 + this.from_second;
        }
        return toSecond;
    }

}
