import BMYoutube from "./objects/BMYoutube";
import BMComponent from "./objects/BMComponent";
import BMImage from "./objects/BMImage";
import BMCard from "./objects/BMCard";
import BMLink from "./objects/BMLink";
import BMList from "./objects/BMList";
import BMShortNumber from "./objects/BMShortNumber";
import BMInfo from "./objects/BMInfo";
import BMFacebook from "./objects/BMFacebook";
import BMTitleBig from "./objects/BMTitleBig";
import BMTitleSmall from "./objects/BMTitleSmall";
import BMApp from "./objects/BMApp";
import BMCategory from "./objects/BMCategory";
import BMCategoryItem from "./objects/BMCategoryItem";
import BMWorkingHours from "./objects/BMWorkingHours";

class BMObjectFactory {

    textToBMComponents(text: string): BMComponent[] {
        let result: BMComponent[] = [];
        text.split("\n\n").forEach(value => {
            if(value.trim() !== "") {
                result.push(this.of(value))
            }
        });

        return result;
    }

    components: {k: string, v: Class} = {
        "youtube": BMYoutube,
        "image": BMImage,
        "card": BMCard,
        "text": BMComponent,
        "title-big": BMTitleBig,
        "title-small": BMTitleSmall,
        "link": BMLink,
        "short-number": BMShortNumber,
        "list": BMList,
        "facebook": BMFacebook,
        "info": BMInfo,
        "app": BMApp,
        "category": BMCategory,
        "category-link": BMCategory,
        "category-item": BMCategoryItem,
        "working-hours": BMWorkingHours,
    };

    of(textDescription: string): BMComponent {
        let newLinePos = textDescription.indexOf("\n");
        let type = textDescription.substr(0, newLinePos);

        let component = this.components[type];

        if(component) {
            return new component(textDescription);
        }

        let bmComponent = new BMComponent(textDescription);
        bmComponent.type = "text";
        return bmComponent;
    }
}

export const bmObjectFactory: BMObjectFactory = new BMObjectFactory();