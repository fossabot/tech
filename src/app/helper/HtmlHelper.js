// @flow

import {categoryStore} from "../store/CategoryStore";

class HtmlHelper {

    // noinspection JSMethodCanBeStatic
    updateHeadMeta(text: string) {
        document.title = text + ", Becoming.lu";

        let category = categoryStore.category;
        let categoryItem = categoryStore.categoryItem;

        // NodeListOf<Element>
        let metas: * = document.getElementsByTagName("META");

        for (const meta of metas) {
            try {
                const metaName = meta.attributes.getNamedItem("property").nodeValue;

                if(metaName === "og:title") {
                    meta.setAttribute("content", text + ", Becoming.lu");
                }

                if(categoryItem) {
                    if(metaName === "og:image") {
                        meta.setAttribute("content", "https://becoming.lu" + categoryItem.imageUrl);
                    }

                    if(metaName === "og:url") {
                        meta.setAttribute("content", "https://becoming.lu/" + category.id + "/" + categoryItem.id);
                    }
                } else if(category) {
                    if(metaName === "og:image") {
                        meta.setAttribute("content", "https://becoming.lu/images/becoming.png");
                    }

                    if(metaName === "og:url") {
                        meta.setAttribute("content", "https://becoming.lu/" + category.id);
                    }
                }
            } catch (e) {
                // ignore
            }

        }
    }
}

export const htmlHelper = new HtmlHelper();