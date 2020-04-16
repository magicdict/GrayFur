import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SkillInfo, AttactSkillInfo, BufferStatusSkillInfo, HealSkillInfo } from '../Modal/SkillInfo';
import { CircleSkillCreator } from '../SkillCreator/CircleSkill';
import { CombineSkillCreator } from '../SkillCreator/CombineSkill';
import { enmSkillType } from '../Modal/EnumAndConst';

@Injectable()
export class SkillMgr {
    constructor(public http: HttpClient) {
        let x = this.http.get("assets/json/skillInfo.json").toPromise().then(x => x as SkillInfo[]);
        x.then(
            r => {
                console.log("skillInfo.json:" + r.length);
            }
        )
    }

    /**查找某人是否拥有武魂融合技 */
    public SearchCombineSkill(RoleName: string): SkillInfo[] {
        return this.SkillinfoList.filter(x => x.Combine.find(x => x === RoleName) !== undefined);
    }

    /**技能字典 */
    public SkillinfoList: SkillInfo[] = [];

    public getSkillInfoByName(SkillName: string): SkillInfo {
        let meta = this.SkillinfoList.find(x => x.Name === SkillName);
        switch (meta.SkillType) {
            case enmSkillType.Attact:
                return Object.assign(new AttactSkillInfo(), meta);
            case enmSkillType.Buffer:
                return Object.assign(new BufferStatusSkillInfo(), meta);
            case enmSkillType.Heal:
                return Object.assign(new HealSkillInfo(), meta);
            default:
                break;
        }
    }

    public InitSkillInfoList() {
        this.SkillinfoList = [];
        //戴沐白
        this.SkillinfoList.push(CircleSkillCreator.白虎护身障());
        this.SkillinfoList.push(CircleSkillCreator.白虎烈光波());
        this.SkillinfoList.push(CircleSkillCreator.白虎金刚变());
        this.SkillinfoList.push(CircleSkillCreator.白虎流星雨());
        //武魂融合技
        this.SkillinfoList.push(CombineSkillCreator.双神共存());
        this.SkillinfoList.push(CombineSkillCreator.复活之光());
        this.SkillinfoList.push(CombineSkillCreator.幽冥白虎_0());
        this.SkillinfoList.push(CombineSkillCreator.幽冥白虎_1());
        this.SkillinfoList.push(CombineSkillCreator.光明圣龙());
    }
}