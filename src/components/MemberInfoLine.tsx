import { For } from 'solid-js';
import { Show } from 'solid-js/web';

type MemberInfoLineProps = {
    valueType: string | undefined;
    value: string | string[] | number | undefined;
};

function MemberInfoLine(props: MemberInfoLineProps) {
    return (
        <>
            <div class="custom-grid">
                <div>
                    <small>
                        <strong>{props.valueType}</strong>
                    </small>
                </div>
                <Show when={Array.isArray(props.value)}>
                    <div>
                        <div class='container'>
                            <For each={props.value as string[]}>
                                {(value) => (
                                    <>
                                        <small>
                                            {value}
                                        </small>
                                        <br />
                                    </>
                                )}
                            </For>
                        </div>
                    </div>
                </Show>
                <Show when={!Array.isArray(props.value)}>
                    <div>
                        <small>
                            {props.value}
                        </small>
                    </div>
                </Show>
            </div>
            <hr />
        </>
    );
}

export default MemberInfoLine;