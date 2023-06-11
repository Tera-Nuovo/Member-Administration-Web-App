import { createEffect, createSignal, For } from "solid-js";

type Props = {
  valueType: string;
  value: string[] | undefined | null;
  propertyName: string;
  onChange: (propertyName: string, value: string[]) => void;
};

function MultiInputField(props: Props) {
  const [fields, setFields] = createSignal(props.value || [""]);

  const handleSearchInput = (e: Event, index: number) => {
    const value = (e.target as HTMLInputElement).value;
    const newFields = [...fields()];
    newFields[index] = value;
    props.onChange(props.propertyName, newFields);
  };

  const addField = () => {
    setFields([...fields(), ""]);
  };

  const removeField = (index: number) => {
    if (fields().length > 1) {
      const newFields = fields().filter((_, i) => i !== index);
      setFields(newFields);
      props.onChange(props.propertyName, newFields);
    }
  };

  return (
    <>
      <div class="container">
        <div>
          <strong>{props.valueType}</strong>
        </div>
        <div class="container">
          <For
            each={fields()}
            children={(field, index) => (
              <div class="grid">
                <input
                  type="text"
                  value={field}
                  onInput={(e: Event) => handleSearchInput(e, index())}
                  name={props.propertyName}
                />
                <button type="button" onClick={() => removeField(index())}>
                  Remove Field
                </button>
              </div>
            )}
          ></For>
          <button type="button" onClick={addField}>
            Add Field
          </button>
        </div>
      </div>
      <hr />
    </>
  );
}

export default MultiInputField;

