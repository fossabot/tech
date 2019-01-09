// @flow

import QuickSummary from '@material-ui/icons/Category';
import Housing from '@material-ui/icons/Home';
import Doctors from '@material-ui/icons/LocalHospital';
import Banks from '@material-ui/icons/LocalAtm';
import Schooling from '@material-ui/icons/LocalLibrary';
import Insurance from '@material-ui/icons/VerifiedUser';
import Cars from '@material-ui/icons/DirectionsCar';
import Bus from '@material-ui/icons/DirectionsBus';
import Legal from '@material-ui/icons/AccountBalance';
import Playgrounds from '@material-ui/icons/ChildFriendly';
import Emergency from '@material-ui/icons/LocalHospital';
import Code from '@material-ui/icons/Code';
import Feedback from '@material-ui/icons/Feedback';
import Job from '@material-ui/icons/Work';
import Train from '@material-ui/icons/Train';
import About from '@material-ui/icons/Help';
import Playground from '@material-ui/icons/ChildCare';
import Shopping from '@material-ui/icons/ShoppingBasket';
import Phone from '@material-ui/icons/Phone';
import Motorcycle from '@material-ui/icons/Motorcycle';
import Event from '@material-ui/icons/Event';
import Learning from '@material-ui/icons/LibraryBooks';

import divider from '@material-ui/icons/OfflineBolt';
import unknown from '@material-ui/icons/ErrorOutline';
import FacebookIcon from "../components/icons/FacebookIcon";

class IconsHelper {

    icons: {} = {
        "quick-summary": QuickSummary,
        "housing": Housing,
        "doctors": Doctors,
        "schooling": Schooling,
        "insurance": Insurance,
        "cars": Cars,

        "bus-train-tram": Bus,
        "bus-train-tram-taxi": Bus,
        "bus-train": Bus,
        "bus": Bus,
        "train": Train,
        "motorcycle": Motorcycle,
        "bicycles": Motorcycle,

        "shopping" : Shopping,

        "phone" : Phone,
        "phone-internet-tv" : Phone,

        "legal": Legal,
        "banks": Banks,
        "learning": Learning,
        "emergency": Emergency,
        "feedback": Feedback,
        "source-code": Code,
        "about": About,
        "job": Job,
        "playgrounds": Playgrounds,
        "events": Event,
        "playground": Playground,
        "facebook": FacebookIcon,
        "divider": divider,
    };

    get(category: string) {
        if(this.icons[category]) {
            return this.icons[category];
        }

        return unknown;
    }
}

export const iconsHelper = new IconsHelper();