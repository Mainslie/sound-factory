import { FC } from "react";
import "./Track.css";

interface TrackButtonProps {
    isRemoval: boolean;
    add: () => void;
    remove: () => void;
}

export const TrackButton: FC<TrackButtonProps> = ({
    isRemoval,
    add,
    remove,
}) => (
    <button className="Track-action" onClick={isRemoval ? remove : add}>
        {isRemoval ? "-" : "+"}
    </button>
);

export default TrackButton;
