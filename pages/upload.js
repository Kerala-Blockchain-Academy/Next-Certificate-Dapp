import { useState } from 'react'
import Router from 'next/router'
import { create } from 'ipfs-http-client'
import Custom from './components/custom'
import Header from './components/header'

const navigation = [
    { name: 'Dashboard', href: '/', current: false },
    { name: 'Issue Certificate', href: '/issue', current: false },
    { name: 'Upload Document', href: '/upload', current: true },
]

export default function Upload() {
    const [id, setID] = useState('');
    const [document, setDocument] = useState(null);

    const handleChange = event => {
        setID(event.target.value);
    }

    const handleFile = event => {
        setDocument(event.target.files[0]);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        console.log(document);
        const ipfs = create('/ip4/127.0.0.1/tcp/5001');
        let result = await ipfs.add(document);
        result.id = id;
        console.log(result)
        const response = await fetch('http://localhost:3000/api/document', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result)
        });
        console.log(await response.json());
        alert("Uploaded successfully");
        Router.push('/');
    }

    return (
        <div>
            <Custom title={navigation[2].name} />
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <Header nav={navigation} />
                <div className="p-4 w-full bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Upload New Document</h5>
                        <div>
                            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Certificate ID</label>
                            <input type="number" min="0" name="id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="390625" onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Select Document</label>
                            <input className="block w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" name="document" type="file" onChange={handleFile} required />
                        </div>
                        <button type="submit" className="w-1/6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Upload Document</button>
                    </form>
                </div>
            </div>
        </div>
    )
}