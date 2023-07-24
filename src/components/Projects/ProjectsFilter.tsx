import React from 'react'

const selectOptions =[
    'Web Application',
	'Mobile Application',
	'Blockchain Application',
	
]


type ProjectFilterProps ={
	setSelectProject?:any
}
const ProjectFilter = ({setSelectProject}:ProjectFilterProps) => {
	return (
		<>
		<label htmlFor="projects" className='hidden'>
			Projects
		</label>
		<select  id='projects' name='projects'
			onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
// console.log(e.target.value)
				setSelectProject(e.target.value);
			}}
			className="
                px-4
                sm:px-6
                py-2
                border
                dark:border-secondary-dark
                rounded-lg
                text-sm
                sm:text-md
                dark:font-medium
                bg-secondary-light
                dark:bg-ternary-dark
                text-primary-dark
                dark:text-ternary-light
            "
		>
			<option value={setSelectProject} className="text-sm sm:text-md">
				All Projects
			</option>

			{selectOptions.map((option) => (
				
				<option className="text-normal sm:text-md" key={option}>
					{option}
				</option>
			))}
		</select>
		
		</>
		
	);
}

export default ProjectFilter; 