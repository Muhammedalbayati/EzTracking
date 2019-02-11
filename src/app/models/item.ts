export class Item {
  itemId: number;
  bolId: number;
  partInfo: string;
  qry: number;
  piecesCount: number;
  hazMat: boolean;
  blanketOn: boolean;
  shockedWatch: boolean;
  damage: boolean;

  pbg: { pbgId: number; pbgType: string };
  container: { containerId: number; containerType: string };
  // pbg: { pbgId: number; pbgType: string };
  // container: { containerId: number; containerType: string };
}
