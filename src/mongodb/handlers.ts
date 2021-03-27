import { colorConsole } from '../utils/console'

export const handleSuccess = (env = 'DEV'): void => {
    const message1 = colorConsole(
        'Successfully connected to the ',
        'green',
        undefined,
        'bright',
    )
    const message2 = colorConsole(env, 'magenta', undefined, 'bright')
    const message3 = colorConsole(' database\n', 'green', undefined, 'bright')

    console.log(`${message1}${message2}${message3}`)
}

export const handleError = (err: Error): void => {
    const message = 'Could not connect to the database . Exiting now...\n'

    console.error(message, { err })

    process.exit()
}
