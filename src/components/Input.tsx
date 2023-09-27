import {
  ButtonHTMLAttributes,
  ChangeEvent,
  DetailedHTMLProps,
  Dispatch,
  InputHTMLAttributes,
  useMemo,
  useRef,
} from 'react'

export default function FileInput({
  id,
  name,
  value,
  accept,
  required,
  onChange,
  className,
  placeholder,
  deleteButton,
  maxLength = 999,
}: Omit<
  Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'value'
  >,
  'onChange'
> & {
  value?: File | null
  onChange?: Dispatch<File | null>
  deleteButton?: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
}) {
  const onChangeFile = (
    e: ChangeEvent<HTMLInputElement> | null,
    file?: File
  ) => {
    if (!file && e?.target.files?.length === 0) return
    onChange?.(file || e?.target.files?.[0] || null)
  }

  const input = useRef<HTMLInputElement>(null)

  const fileName = useMemo(() => {
    if (!value?.name) return ''
    else if (value.name.length <= maxLength) return value.name
    else return '...' + value.name.slice(value.name.length - maxLength + 3)
  }, [value, maxLength])

  return (
    <div
      onClick={() => input.current?.click()}
      onDragOver={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      onDrop={(e) => {
        e.preventDefault()
        e.stopPropagation()
        if (
          e.dataTransfer.files?.length &&
          (!accept || accept.includes(e.dataTransfer.files[0].type))
        )
          onChangeFile(null, e.dataTransfer.files[0])
      }}
      className={className}
    >
      <p>{fileName || placeholder}</p>
      {value && (
        <button
          {...deleteButton}
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onChangeFile(null)
          }}
        ></button>
      )}
      <input
        id={id}
        type="file"
        ref={input}
        name={name}
        accept={accept}
        key={value?.name || ''}
        required={!value && required}
        onChange={(e) => onChangeFile(e)}
      />
    </div>
  )
}
