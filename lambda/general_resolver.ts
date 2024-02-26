import { ListGeneralsArguments, listGenerals } from "./service/list_generals";
import { UpdateGeneralFromUserArguments, updateGeneralFromUser } from "./service/update_general_from_user";

type AppSyncEvent = {
    info: {
        fieldName: string;
    };
    arguments: ListGeneralsArguments | UpdateGeneralFromUserArguments;
};

// Lambda function handler
exports.handler = async (event: AppSyncEvent) => {
    console.log(`event: ${JSON.stringify(event)}`);
    switch (event.info.fieldName) {
        case 'listGenerals':
            return await listGenerals(event.arguments as ListGeneralsArguments);
        case 'updateGeneralFromUser':
            return await updateGeneralFromUser(event.arguments as UpdateGeneralFromUserArguments);
        default:
            return null;
    }
};