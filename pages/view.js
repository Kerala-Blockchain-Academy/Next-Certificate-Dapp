import Image from 'next/image';
import Router from 'next/router';
import Custom from './components/custom';
import Header from './components/header';

const navigation = [
    { name: 'Dashboard', href: '/', current: false },
    { name: 'Issue Certificate', href: '/issue', current: false },
    { name: 'Upload Document', href: '/upload', current: false }
]

export default function View({ response }) {
    console.log(response);

    const redirect = event => {
        event.preventDefault();
        Router.push(`http://127.0.0.1:8080/ipfs/${response.path}`);
    }

    return (
        <div>
            <Custom title={'Document Info'} />
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <Header nav={navigation} />
                <div className="mx-auto max-w-xl h-auto bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col items-center p-10">
                        <h1 className="my-4">Kerala Blockchain Academy</h1>
                        <span className="text-lg text-gray-500 dark:text-gray-400">Document(s) concerning</span>
                        <h3 className="my-4 text-2xl font-medium text-gray-900 dark:text-white">Certificate ID: {response.id}</h3>
                        <span className="text-lg text-gray-500 dark:text-gray-400">is uploaded in IPFS with CID</span>
                        <h3 className="my-4 text-lg font-medium text-gray-900 dark:text-white">{response.path}</h3>
                        <button type="button" className="bg-[#6ACAD1] hover:bg-[#469EA2] hover:text-white border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 my-4" onClick={redirect}>
                            View on IPFS&ensp;
                            <Image src="/ipfs.svg" height="25" width="25" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    let id = context.query.id;
    const response = await fetch(`http://localhost:3000/api/document?id=${id}`);
    return {
        props: { response: await response.json() }
    }
}
