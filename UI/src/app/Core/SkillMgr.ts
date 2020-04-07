import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SkillInfo, AttactSkillInfo, enmSkillType, BufferStatusSkillInfo, HealSkillInfo } from '../Modal/SkillInfo';
import { SkillCreator } from '../Creator/SkillCreator';

@Injectable()
export class SkillMgr {
    constructor(public http: HttpClient) { 
        let x = this.http.get("assets/json/skillInfo.json").toPromise().then(x => x as SkillInfo[]);
        x.then(
            r => {
                this.SkillinfoList = r;
            }
        )
    }
    
    public SkillinfoList: SkillInfo[] = [];

    public getSkillInfoByName(SkillName: string): SkillInfo {
        let meta = this.SkillinfoList.find(x => x.Name === SkillName);
        switch (meta.SkillType) {
            case enmSkillType.Attact:
                return Object.assign( new AttactSkillInfo(), meta );    
            case enmSkillType.Buffer:
                return Object.assign( new BufferStatusSkillInfo(), meta );   
            case enmSkillType.Heal:
                return Object.assign( new HealSkillInfo(), meta );   
            default:
                break;
        }
    }

    public LogJson() {
        this.SkillinfoList.push(SkillCreator.白虎护身障());
        this.SkillinfoList.push(SkillCreator.白虎烈光波());
        this.SkillinfoList.push(SkillCreator.白虎金刚变());
        this.SkillinfoList.push(SkillCreator.白虎流星雨());
        console.log(JSON.stringify(this.SkillinfoList));
    }
}