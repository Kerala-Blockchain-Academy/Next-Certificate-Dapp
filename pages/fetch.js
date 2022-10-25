import Custom from "./components/custom"
import Header from "./components/header"

const navigation = [
    { name: 'Dashboard', href: '/', current: false },
    { name: 'Issue Certificate', href: '/issue', current: false },
    { name: 'Upload Document', href: '/upload', current: false }
]

export default function Fetch({ response }) {
    console.log(response);
    return (
        <div>
            <Custom title={'Certificate Info'} />
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <Header nav={navigation} />
                <div className="mx-auto max-w-xl h-auto bg-white rounded-lg border-8 border-teal-500 shadow-md dark:bg-gray-800 dark:border-pink-400">
                    <div className="border-4 border-slate-500 rounded-lg m-1">
                        <div className="border-4 border-teal-500 rounded-lg m-6">
                            <div className="border-2 border-slate-500 rounded-lg m-1">
                                <div className="flex flex-col items-center p-10">
                                    <h2 className="mb-4 text-lg">Kerala Blockchain Academy</h2>
                                    <span className="text-lg text-gray-500 dark:text-gray-400">This is to certify that</span>
                                    <h3 className="my-4 text-2xl font-medium text-gray-900 dark:text-white">{response.result[0]}</h3>
                                    <span className="text-lg text-gray-500 dark:text-gray-400">has successfully completed</span>
                                    <h3 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{response.result[1]}</h3>
                                    <span className="text-lg text-gray-500 dark:text-gray-400">with</span>
                                    <h3 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">{response.result[2]} Grade.</h3>
                                </div>
                                <div className="flex grow">
                                    <p className="grow ml-8">Certificate ID: {response.id}</p>
                                    <div className="mr-8 text-end">
                                        <p>Date: {response.result[3]}</p>
                                        <p>Trivandrum</p>
                                    </div>
                                </div>
                                <br /><br />
                                <div className="mr-8 mb-4 text-end">
                                    <p>(sd/-)</p>
                                    <p>Director</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    let id = context.query.id;
    const response = await fetch(`http://localhost:3000/api/certificate?id=${id}`);
    return {
        props: { response: await response.json() }
    }
}
