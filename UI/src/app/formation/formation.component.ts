import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Character } from '../Modal/Character';


@Component({
    selector: 'app-formation',
    templateUrl: './formation.component.html',
})
export class FormationComponent implements OnInit {
    constructor() { }

    @Input() Fighterlist: Character[];

    //Row1
    R1C1: Character = undefined;
    R1C2: Character = undefined;
    R1C3: Character = undefined;
    R1C4: Character = undefined;
    //Row2 
    R2C1: Character = undefined;
    R2C2: Character = undefined;
    R2C3: Character = undefined;
    R2C4: Character = undefined;

    @Output() ItemClickedEmit: EventEmitter<Character> = new EventEmitter();
    ItemClicked(clickedItem: Character) {
        this.ItemClickedEmit.emit(clickedItem);
    }

    ngOnInit(): void {
        this.R1C1 = this.Fighterlist[0];
        this.R1C2 = this.Fighterlist[1];
        this.R1C3 = this.Fighterlist[2];
        this.R1C4 = this.Fighterlist[3];
        this.R2C1 = this.Fighterlist[4];
        this.R2C2 = this.Fighterlist[5];
        this.R2C3 = this.Fighterlist[6];
        this.R2C4 = this.Fighterlist[7];
    }
}