// @flow
import { Vector2 } from "@/lib/geom/Vector2";
import Road from "@/network/Road";
import Traveller from "@/network/Traveller";
import ConnectionDirection from "@/network/ConnectionDirection";

export interface NetworkNode {
    readonly canConsumeTraveller: boolean;
    readonly incomingConnections: ReadonlyArray<Road>;
    readonly isDestination: boolean;
    readonly outgoingConnections: ReadonlyArray<Road>;
    readonly position: Vector2;
    connectTo(target: Road, direction: ConnectionDirection): void;
    consumeTraveller(traveller: Traveller): void;
    getAllReachableNodes(visitedNodes?: Set<NetworkNode>): NetworkNode[];
    getVisualConnectionPointAtAngle(radians: number): Vector2;
}
