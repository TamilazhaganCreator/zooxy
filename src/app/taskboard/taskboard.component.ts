import { Component, EventEmitter, OnInit } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { CardModel, ListModel, CommentModel } from './model';

@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.css']
})
export class TaskboardComponent implements OnInit {

  list: ListModel[] = []
  showAddBox = false
  newListHeader = ""
  newDetailName = ""
  showDetailBox: boolean[] = []
  taskModalActions = new EventEmitter<string | MaterializeAction>();
  modalList = new ListModel();
  comment = ""
  constructor() { }

  ngOnInit() {
    this.predefinedValues()
  }

  addDetails(headerId: number) {
    if (this.newDetailName != "" && this.newDetailName != null) {
      let id = headerId - 1
      let tempId = this.list[id].cards.length ? this.list[id].cards.length - 1 : 0
      let card = new CardModel()
      card.id = tempId + 1
      card.name = this.newDetailName
      this.list[id].cards.push(card)
      this.list = [...this.list]
      this.showDetailBox[id + 1] = false
      this.newDetailName = ""
    }
  }

  closeOtherDetailBox(id: number) {
    this.showDetailBox[id] = true
    this.newDetailName = ""
  }

  addHeader() {
    if (this.newListHeader != "" && this.newListHeader != null) {
      let id = (this.list.length > 0) ? this.list[this.list.length - 1].id : 0
      let header = new ListModel()
      header.id = id + 1;
      header.headerName = this.newListHeader
      this.list.push(header)
      this.newListHeader = ""
      this.showAddBox = false
    }
  }

  saveComment() {
    let headerId = this.list.findIndex(l => l.id == this.modalList.id)
    let cardId = this.list[headerId].cards.findIndex(c => c.id == this.modalList.cards[0].id)
    let comment = new CommentModel()
    comment.time = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
    comment.name = this.comment
    this.list[headerId].cards[cardId].comments.push(Object.assign({}, comment))
    this.modalList.cards[0].comments.push(comment)
    this.comment = ""
  }

  openModal(headerId: number, card: CardModel) {
    this.modalList = new ListModel()
    this.modalList.headerName = this.list[headerId - 1].headerName
    let temp = Object.assign({}, card)
    this.modalList.cards.push(temp)
    this.modalList.cards[0].comments = temp.comments.map(c => Object.assign({}, c))
    this.modalList.id = headerId
    setTimeout(() => {
      this.taskModalActions.emit({ action: "modal", params: ['open'] })
    }, 100);
  }

  predefinedValues(){
    let list1 = new ListModel()
    list1.id = 1
    list1.headerName = "Task OnGoing"
    let card = new CardModel()
    card.id = 1
    card.name = "Dashboard design"
    list1.cards.push(card)
    let card1 = new CardModel()
    card1.id = 2
    card1.name = "Table design"
    list1.cards.push(card1)
    let card4 = new CardModel()
    card4.id = 3
    card4.name = "Quick alert"
    list1.cards.push(card4)
    let list2 = new ListModel()
    list2.id = 2
    list2.headerName = "Task Completed"
    let card2 = new CardModel()
    card2.id = 1
    card2.name = "Historic Report"
    list2.cards.push(card2)
    let card3 = new CardModel()
    card3.id = 2
    card3.name = "Bug Fixes"
    list2.cards.push(card3)
    this.list.push(list1)
    this.list.push(list2)
  }

}
