import 'preact';

declare module 'preact' {
	namespace JSX {
		interface HTMLAttributes<RefType extends EventTarget = EventTarget>
			extends ClassAttributes<RefType>,
				DOMAttributes<RefType>,
				AriaAttributes {
			tw?: string;
		}
	}
}
