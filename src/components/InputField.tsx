import { useUserRedirect } from "~/hooks/useUserRedirect";

type Props = {
    valueType: string;
    value: string | undefined | number | null;
    propertyName: string;
    onChange: (propertyName: string, value: string | undefined | number | null) => void;
};

export function routeData() {
    return useUserRedirect();
}

function InputField(props: Props) {
    const handleSearchInput = (e: Event) => {
        const value = (e.target as HTMLInputElement).value;
        props.onChange(props.propertyName, value);
    };

    return (
        <>
            <div class="container">
                <div>
                    <strong>{props.valueType}</strong>
                </div>
                <div >
                    <input type="text" value={props.value ?? ""} onInput={handleSearchInput} name={props.propertyName} />
                </div>
            </div>
            <hr />
        </>
    );
}

export default InputField;
