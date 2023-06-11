type Props = {
    valueType: string;
    value: string | undefined | number | null;
    propertyName: string;
};


function ReadOnlyField(props: Props) {

    return (
        <>
            <div class="container">
                <div>
                    <strong>{props.valueType}</strong>
                </div>
                <div >
                    <input type="text" value={props.value ?? ""} name={props.propertyName} readonly />
                </div>
            </div>
            <hr />
        </>
    );
}

export default ReadOnlyField;