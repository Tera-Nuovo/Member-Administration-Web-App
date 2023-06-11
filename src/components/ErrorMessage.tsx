import { Show } from "solid-js";

function ErrorMessage(props: { error: string | undefined }) {
    return (
        <>
            <Show when={props.error !== '' && props.error !== undefined}>
                <p class="error" role="alert">{props.error}</p>
            </Show>
        </>
    )
}

export default ErrorMessage;