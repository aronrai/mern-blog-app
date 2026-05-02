import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <>
      <section className="min-h-[calc(100vh-96px)] px-4 sm:px-8 md:px-16 py-16 flex flex-col gap-8">
        <Helmet>
          <title>Blogspot &bull; About</title>
        </Helmet>
        <h1 className="text-4xl font-heading font-bold">About Blogspot</h1>
        <p className="text-sm text-gray-600">
          Blogspot is a dynamic, all-in-one community designed for both
          passionate storytellers and curious readers to connect through the
          power of words. It offers a seamless, intuitive interface where users
          can easily publish their own unique perspectives while exploring a
          diverse world of content curated by others. Whether you're looking to
          build a digital legacy as a writer or discover fresh insights as a
          reader, the platform bridges the gap between creation and discovery in
          a single, streamlined experience.
        </p>
        <h2 className="text-2xl font-heading font-medium">
          Technical Journey & Learning Objectives
        </h2>
        <p className="text-sm text-gray-600">
          I built this web app as a comprehensive 'mastery project' to bridge
          the gap between theoretical knowledge and production-ready
          engineering. My goal was to move beyond simple tutorials and tackle
          the real-world challenges of a full-stack ecosystem. By developing
          this platform, I gained hands-on experience in implementing stateless
          authentication with JWT, securing protected routes, and managing
          complex Authorization (Authz) flows to protect user data.
        </p>
        <p className="text-sm text-gray-600">
          The project served as a deep dive into the core pillars of modern
          development: from designing RESTful APIs and enforcing strict
          schema-based data validation with Joi to handling multi-part file
          uploads and dynamic pagination for optimized performance. I integrated
          Cloudinary for scalable, cloud-based image management and utilized
          Zustand for lightweight, global state management to ensure a reactive
          frontend. Every feature, styled with Tailwind CSS, was an opportunity
          to solve the architectural hurdles of a scalable, secure, and
          user-centric application.
        </p>
        <div className="grid grid-cols-[1fr_3px_1fr] my-4">
          <div></div>
          <div className="bg-blue-500"></div>
          <div className="flex flex-col gap-2 p-4">
            <h3 className="text-2xl font-heading font-medium">
              The Architecture
            </h3>
            <ul className="text-sm text-gray-600">
              <li>MongoDB & Mongoose</li>
              <li>Express.js</li>
              <li>React</li>
              <li>Node.js</li>
            </ul>
          </div>
          <div className="flex flex-col gap-2 ml-auto p-4 text-right">
            <h3 className="text-2xl font-heading font-medium">UI & State</h3>
            <ul className="text-sm text-gray-600">
              <li>Tailwind CSS</li>
              <li>Zustand</li>
              <li>Responsive Design</li>
            </ul>
          </div>
          <div className="bg-blue-500"></div>
          <div></div>
          <div></div>
          <div className="bg-blue-500"></div>
          <div className="flex flex-col gap-2 p-4">
            <h3 className="text-2xl font-heading font-medium">Security</h3>
            <ul className="text-sm text-gray-600">
              <li>JSON Web Tokens (JWT)</li>
              <li>Stateless AuthN & AuthZ</li>
              <li>Joi Data Validation</li>
            </ul>
          </div>
          <div className="flex flex-col gap-2 ml-auto p-4 text-right">
            <h3 className="text-2xl font-heading font-medium">Integrations</h3>
            <ul className="text-sm text-gray-600">
              <li>
                Cloudinary <span className="">(Image Hosting)</span>
              </li>
            </ul>
          </div>
          <div className="bg-blue-500"></div>
          <div></div>
          <div></div>
          <div className="bg-blue-500"></div>
          <a
            href="https://github.com/aronrai/mern-blog-app"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-black px-4 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors duration-300 mr-auto m-4 rounded-sm"
          >
            Source Code
          </a>
        </div>
      </section>
    </>
  );
};

export default About;
