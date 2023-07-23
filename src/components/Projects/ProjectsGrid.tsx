import { useState } from "react";
import ProjectSingle from "./ProjectSingle";
import { projectsData } from "@/data/projectsData";
import ProjectFilter from "./ProjectsFilter";
import {Search} from '@styled-icons/ionicons-solid/Search'




const ProjectsGrid = () => {

    const [searchProject, setSearchProject] = useState<string>();
	const [selectProject, setSelectProject] = useState<any>();


    const allProjects = 'All Projects'
	// @todo - To be fixed
	// const searchProjectsByTitle = projectsData.filter((item) => {
	// 	const result = item.title
	// 		.toLowerCase()
	// 		.includes(searchProject.toLowerCase())
	// 		? item
	// 		: searchProject == ''
	// 		? item
	// 		: '';
	// 	return result;s
	// });


    console.log(selectProject)
    const selectProjectsByCategory = projectsData.filter((item) =>{
//console.log(item)

         let category = item.category.charAt(0).toUpperCase() + item.category.slice(1)
       //console.log(category)
       return category.includes(selectProject)
   })

//    console.log(selectProjectsByCategory)
  return (

    <section className="container py-8 sm:py-10 mt-5 sm:mt-10">

<div className="text-center">
<p className="font-general-medium text-2xl sm:text-4xl mb-1   text-white">
					Projects portfolio
				</p>
</div>

<div className="mt-10 sm:mt-16">
<h3
					className="
                        font-general-regular 
                        text-center text-secondary-dark
                         dark:text-white
                        text-md
                        sm:text-xl
                        mb-3
                        "
				>
					Search projects by title or filter by category
				</h3>

                <div className="flex justify-between border-b border-body-color/[.15] pb-16 dark:border-white/[.15]pb-3 gap-3">


                    <div className="flex justify-between gap-2">

                        <span className="hidden sm:block bg-primary-light dark:bg-primary-dark p-2 5 shadow-sm rounded-xl cursor-pointer">
                        <Search className="  text-body-color w-5 h-5"></Search>
                        </span>

                        <input
							onChange={(e) => {
								setSearchProject(e.target.value);
							}}
							className="
                                ont-general-medium 
                                pl-3
                                pr-1
                                sm:px-4
                                py-2
                                border 
                            border-gray-200
                                dark:border-secondary-dark
                                rounded-lg
                                text-sm
                                sm:text-md
                                bg-secondary-light
                                dark:bg-ternary-dark
                                 text-body-color
                                "
							id="name"
							name="name"
							type="search"
							required
							placeholder="Search Projects"
							aria-label="Name"
						/>
                    </div>

                    <ProjectFilter setSelectProject={setSelectProject}/>

                </div>
</div> 

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 sm:gap-5">
{selectProject && selectProject!==allProjects
					? selectProjectsByCategory.map((project, index) => {
							return <ProjectSingle key={index} {...project} />;
					  })
					: projectsData?.map((project, index) => (
							<ProjectSingle key={index} {...project} />
					  ))}
</div>
    </section>
  )
}

export default ProjectsGrid