import { useUserRedirect } from "~/hooks/useUserRedirect";
import { setEditedMember } from "~/routes/editMember";



type Props = {
    valueType: string;
    value: string | undefined | number | null | string[];
    propertyName: string;
};

export function routeData() {
    return useUserRedirect();
}

function HiddenInputField(props: Props) {

    setEditedMember(prevState => ({ ...prevState, [props.propertyName]: props.value }));

    return (
        <>
            <div class="container">
                <div>
                    <strong>{props.valueType}</strong>
                    <p>{props.value ?? ""}</p>
                </div>
                <div >
                    <input type="hidden" value={props.value ?? ""} name={props.propertyName} />
                </div>
            </div>
            <hr />
        </>
    );
}

export default HiddenInputField;
