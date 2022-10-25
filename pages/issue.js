import { useReducer } from 'react'
import Router from 'next/router'
import Custom from './components/custom'
import Header from './components/header'

const navigation = [
    { name: 'Dashboard', href: '/', current: false },
    { name: 'Issue Certificate', href: '/issue', current: true },
    { name: 'Upload Document', href: '/upload', current: false },
]

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

export default function Issue() {
    const [formData, setFormData] = useReducer(formReducer, {});

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    const handleSubmit = async event => {
        event.preventDefault();
        console.log(formData);
        const response = await fetch('http://localhost:3000/api/certificate', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(formData) // body data type must match "Content-Type" header
        });
        console.log(await response.json());
        alert("Issued successfully");
        Router.push('/');
    }

    return (
        <div>
            <Custom title={navigation[1].name} />
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <Header nav={navigation} />
                <div className="p-4 w-full bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Issue New Certificate</h3>
                        <div>
                            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Candidate Name</label>
                            <input name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Jane Doe" onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Course Title</label>
                            <select name="course" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" defaultValue={"default"} onChange={handleChange}>
                                <option disabled value="default">Select a course</option>
                                <option>Certified Blockchain Associate</option>
                                <option>Certified Ethereum Developer</option>
                                <option>Certified Hyperledger Fabric Developer</option>
                                <option>Certified Blockchain Architect</option>
                            </select>
                        </div>
                        <div className="flex">
                            <div className=" grow">
                                <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Certificate ID</label>
                                <input type="number" min="0" name="id" id="id" placeholder="390625" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={handleChange} required />
                            </div>
                            <div className="mx-10 grow">
                                <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Grade</label>
                                <select name="grade" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" defaultValue={"default"} onChange={handleChange}>
                                    <option disabled value="default">Select a grade</option>
                                    <option>S</option>
                                    <option>A</option>
                                    <option>B</option>
                                    <option>C</option>
                                </select>
                            </div>
                            <div className="grow">
                                <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Date</label>
                                <input type="date" name="date" id="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={handleChange} required />
                            </div>
                        </div>
                        <button type="submit" className="w-1/6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Issue Certificate</button>
                    </form>
                </div>
            </div>
        </div>
    )
}