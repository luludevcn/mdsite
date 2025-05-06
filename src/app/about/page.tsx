
export default function About() {

    const skills = [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Next",
        "Angular",
        "Typescript",
        "Node",
        "Express",
        "Nginx",
        "Mongodb",
        "Markdown",
        "Docker"
    ];

    const outputs: any[] = [

    ];

    const contacts = [
        {
            label: "github.com/luludevcn",
            target: "https://github.com/luludevcn",
        },
        { label: "luludevcn@gmail.com", target: "mailto:luludevcn@gmail.com" },
    ];

    return (
        <div className="w-4/5 ml-auto mr-auto mt-5">
            <h1>Me</h1>
            <div className="gap-4">
                <p>一个全栈工程师</p>
                <p className="mt-2">React、Nodejs追随者</p>
                <p className="mt-2">因为Java喜欢上了TypeScript</p>
                <p className="mt-2">希望分享的一些东西能对大家有所帮助</p>
            </div>
            <hr className="border-gray-400 mt-5" />
            <h1>Skills</h1>
            <div className="flex flex-wrap gap-4">
                {
                    skills.map((skill) => (
                        <span key={skill} className="flex shadow-lg p-3 capitalize bg-opacity-20 bg-blue-100 rounded text-blue-800">
                            {skill}
                        </span>
                    ))
                }
            </div>
            <hr className="border-gray-400 mt-5" />
            <h1>Output</h1>
            <div className="flex flex-wrap gap-4">
                {
                    outputs.length ? (
                        outputs.map((output) => (
                            <a
                                href={output.target}
                                target="_blank"
                                className="flex shadow-lg p-3 bg-opacity-20 bg-blue-100 text-blue-800 rounded hover:underline"
                            >
                                {output.label}
                            </a>
                        ))
                    ) : (
                        <p className="text-gray-400">Comming Soon ...</p>
                    )
                }
            </div>
            <hr className="border-gray-400 mt-5" />
            <h1>Contact</h1>
            <div className="gap-4 flex flex-wrap">
                {
                    contacts.map((contact) => (
                        <a
                            href={contact.target}
                            target="_blank"
                            key={contact.label}
                            className="flex shadow-lg p-3 bg-opacity-20  bg-blue-100 text-blue-800 rounded hover:underline"
                        >
                            {contact.label}
                        </a>
                    ))
                }
            </div>
        </div >
    );
}
