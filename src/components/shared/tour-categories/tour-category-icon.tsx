import React, { useEffect, useRef, useState } from 'react'
type IconProps = {
  name: string,
  fill?: string,
  width?: string,
  height?: string
}

function useDynamicSVGImport ({ name }: IconProps) {
  const ImportedIconRef = useRef()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error>()

  useEffect(() => {
    setLoading(true)
    const importIcon = async () => {
      try {
        const importedFile = await import(`!!@svgr/webpack?-svgo,+titleProp,+ref!../../../static/img/tour/${name}.svg`)

        console.log('imp', importedFile.default)

        const component = importedFile.ReactComponent
        // @ts-ignore
        ImportedIconRef.current = component
        console.log('comp:', component)
      } catch (err: unknown) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }
    importIcon()
  }, [name])

  return { error, loading, SvgIcon: ImportedIconRef.current }
}

// @ts-ignore
// eslint-disable-next-line react/prop-types
const Icon = ({ name, fill, width, height }: IconProps): JSX.Element | null => {
  const { error, loading, SvgIcon } = useDynamicSVGImport({
    name
  })

  console.log(error, loading, SvgIcon)

  if (SvgIcon) {
    // @ts-ignore
    return <SvgIcon fill={fill} width={width} height={height} />
  }
  return null
}

const TourCategoryIcon = () => {
  const [name, setName] = useState('running')

  // @ts-ignore
  return (
    <div className="App">
      <button
        onClick={() =>
          setName((prevName) => (prevName === 'running' ? 'skiing' : 'terrain'))
        }
      >
        Change Icon
      </button>
      <section>
        <Icon
          name={name}
          fill="gray"
        />
        <Icon
          name="skiing"
          fill="gray"
          width="300"
        />
        <Icon
          name="terrain"
          fill="darkblue"
          height="100"
        />
      </section>
    </div>
  )
}

export default TourCategoryIcon
