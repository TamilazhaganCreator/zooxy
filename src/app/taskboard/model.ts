export class HeaderModel {
    name: string = "";
    id: number = 0;
}

export class DetailModel {
    headerId: number = 0;
    id: number = 0;
    name: string = ""
}

export class CardModel {
    id: number = 0
    name: string = ""
    comments: CommentModel[] = []
}

export class CommentModel{
    time: string = ""
    name: string = ""
}

export class ListModel {
    id: number = 0
    headerName: string = ""
    cards: CardModel[] = []
}