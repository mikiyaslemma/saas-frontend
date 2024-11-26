

export const navItems = [
  
  {
    href: '/dashboard',
    label: 'Dashboad',
    subMenu: [
      
    ],
    icon: '/public/assets/svg/dashboard.svg'
  },

  {
    label: "Employee Profile",
     icon: "",
    subMenu: [
      {
        href: "/employee/addEmployee",
        label: "Add Employee",
        subMenu: [],
        icon: "/add.svg",
        resourceName: "Add Employee", // Add resource name for role check
      },
      {
        href: "/employee/list",  
        label: "List Employee",
        resourceName: "Get All Employees", // Add resource name for role check
        subMenu: [],
        icon: "/add.svg",
      },

      {
        href: "/employee/details",  
        resourceName: "Get Employee by Employee ID", // Add resource name for role check
        label: "Your Profile",
        subMenu: [],
        icon: "/add.svg",
      }
      
      

  
    ],

  },

  {
    label: 'Recruitment',
     icon: "/organization.svg",
    subMenu: [
      {
        href: "/recruitment/create",
        label: " Manage Recruitment ",
        resourceName: "Add Recruitment", // Add resource name for role check
        subMenu: [],
       icon: "/add.svg",
      },

      {
        href: "/recruitment/list",
        label: " List Recruitment ",
        resourceName: "Get All Recruitments", // Add resource name for role check
        subMenu: [],
       icon: "/add.svg",
      },
    
    
    ],
  },
  
  {
    
    label: 'Training',
     icon: "/organization.svg",
    subMenu: [
      {
        label: " Annual Training ",
        subMenu: [
          {
            href: "/training/trainingCourse",
            label: "Training Course",
            subMenu: [],
           icon: "/add.svg",
          },
    
          {
            href: "/training/trainingInstution",
            label: "Training Institution",
            subMenu: [],
           icon: "/add.svg",
          },

    
          {
            href: "/training/annualTrainingRequest",
            label: "Annual Training Request",
            subMenu: [],
           icon: "/add.svg",
          },
          {
            href: "/training/annualPlan",
            label: " Annual Training Plan",
            subMenu: [],
           icon: "/add.svg",
          },

    
        ],
       icon: "/add.svg",
      },

      
      {
        label: "Pre Service",
        subMenu: [
          {
            href: "/training/preserviceCourses",
            label: "Pre-Service Course",
            subMenu: [],
           icon: "/add.svg",
          },
          {
            href: "/training/preserviceTraining",
            label: "Pre-Service Training",
            subMenu: [],
           icon: "/add.svg",
          },
       
          
        ],
       icon: "/add.svg",
      },
      {
        label: "InterniShip",
        subMenu: [
          {
            href: "/training/university",
            label: "University",
            subMenu: [],
           icon: "/add.svg",
          },
          {
            href: "/training/internstudent",
            label: "Interniship Student",
            subMenu: [],
           icon: "/add.svg",
          },
          
        ],
       icon: "/add.svg",
      },
      {
        label: "Education ",
        subMenu: [
          {
            href: "/training/educationOpportunity",
            label: "Education Opportunity",
            subMenu: [],
           icon: "/add.svg",
          },
        
        ],
       icon: "/add.svg",
      },
     
     
      
    
    ],
  },
  
  {
    label: 'Planning',
     icon: "/organization.svg",
    subMenu: [
      {
        href: "/planning/needRequest",
        label: " Need Request ",
        subMenu: [],
       icon: "/add.svg",
      },
    
    
    ],
  },
  
  
  
];
