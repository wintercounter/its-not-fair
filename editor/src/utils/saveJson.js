const download = (data, filename) => {
    const blob = new Blob([data], { type: 'octet/stream' })

    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = filename

    a.click()

    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
}

const saveJson = level => {
    download(JSON.stringify(level), 'map.json')
}
export default saveJson
