
export class DataFiller {
    static filterHTMLRegex = /{{(?<js>([<>\w\d'"!?:\[\];,=().*\/+-])*|^({{2,})|^(}{2,}))}}/gm
    static fillView = (data, templateText) => {
        let m;
        while (m = DataFiller.filterHTMLRegex.exec(templateText)) {
            const toExec = m.groups.js
            const execResult = eval(toExec)
            if (typeof execResult !== 'object' && typeof execResult !== 'function') { 
                templateText = templateText.replace(m[0], execResult)
            }
            else if (Array.isArray(execResult))
            {
                templateText = templateText.replace(m[0], execResult.join(''))
            }
        }
        return templateText
    }
}