# Introduction

This repository contains the source code for the Battery Development Data Analysis Tool. The tool uses React JS for the front end and Express for the backend, offering a scalable solution for analyzing battery development data.

# Features
                   
- ***User-friendly Interface:*** Intuitive UI using React JS for easy navigation and data analysis.
- ***Responsive Design:*** Adapts to different screen sizes and devices, ensuring a seamless user experience.
- ***Data Upload:*** Users can upload large CSV files for analysis.
- ***Interactive Data Visualization:*** Provides a variety of interactive visualization components, including line, multi-line, and scatter plots.
- ***Customization Options:*** Users can customize visualization parameters such as chart type, colors, and axis labels.
- ***Zoom In/Out:*** Allows users to zoom in and out to explore details within plots.
- ***Download Plots:*** Users can download visualized plots for further analysis or sharing.
- ***Data Filtering:*** Functionality for filtering data based on user-defined criteria.

# Installation
To run the Data Analysis Tool locally, follow these steps:

1. Clone the repository to your local machine.
```bash 
https://github.com/5HATIM5/Data_Visualization_Tool.git 
```

2. Navigate to the project directory.
```bash 
cd data-visualization-tool
```

3. Configure the backend data source file to match the database details. Modify the AppDataSource object in the ```src/database/data-source.ts``` file as follows:
```javascript
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [FileData],
  migrations: [],
  subscribers: [],
});

```

3. Install dependencies for the frontend and backend.
```bash 
cd frontend
npm install
cd ../backend
npm install

```

4. Start the frontend and backend servers.
```bash 
cd frontend
npm run dev
```
```bash 
cd backend
npm run dev
```

5. Open your browser and navigate to http://localhost:5173 to access the application.

6. Upload the ```Test_Data_File ``` to run Analysis.

# Usage
1. Upload CSV files containing battery development data using the provided interface.
2. Explore the interactive visualization components to analyze the data.
3. Customize visualization parameters such as chart type, colors, and axis labels to suit your requirements.
4. Zoom in and out to focus on specific details within plots.
5. Download visualized plots for further analysis or sharing.

# Performance
Upload Speed: The upload speed for a 15 MB file was tested to be approximately 19 seconds.

# Contributing
Contributions to the Battery Development Data Analysis Tool are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

# Demo Video
https://github.com/5HATIM5/Data_Visualization_Tool/assets/75577655/8c289c6e-d470-4155-beeb-a7c0f551538d
