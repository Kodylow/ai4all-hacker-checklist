import "./App.css";
import Button from './Button'
import { BrowserRouter } from 'react-router-dom'
import { FaChevronRight } from "react-icons/fa";


const resourcesData = {
  "__comment": "by default, all feilds are required, except: link.emoji OR link.logo, link.color",
  "data": [
    {
      "title": "1. Get a WebLN Browser Extension",
      "description": "Good user experience and creativity is critical for any technology to reach the masses.",

      "links": [
        {
          "title": "ZBD",
          "description": "Alby is a Lightning Browser Extension",
          "link": "https://bit.ly/bitcoin-design-guide",
          "emoji": "🏁",
          "color": "#FEFCE8",
          "linkCTA": "Visit Guide"
        },

        {
          "title": "Join the Discord",
          "description": "Meet other designers, developers, copywriters, and other creatives working to drive bitcoin adoption through awesome UX.",
          "link": "https://bit.ly/bitcoin-design-discord",
          "emoji": "🌐",
          "color": "#e7e0f8",
          "linkCTA": "Join Discord"
        },
        {
          "title": "What is WebLN?",
          "description": "A guide that explains what is WebLN, and how it can be used to build lightning applications on the web.",
          "link": "https://webln.guide/",
          "emoji": "🤔",
          "color": "#FEFCE8",
          "linkCTA": "Visit Guide"
        },
      ]
    },
    {
      "title": "2. Register for the hackathon",
      "description": "",

      "links": [
        {
          "title": "What is Nostr?",
          "description": "A web-socket based social network that has caught the attention of Twitter's founder Jack Dorsey who's going to fund $5 million dollars for ecosystem projects.",
          "link": "https://bit.ly/heynostr",
          "emoji": "💡",
          "color": "#FEFCE8",
          "linkCTA": "Learn what is Nostr"
        },

        {
          "title": "Resources for developers",
          "description": "Building Nostr applications is super easy, you just need to know a bit of HTML+CSS and enough javascript to use websockets.",
          "link": "https://makers.bolt.fun/story/list-of-resources-to-learn-nostr--833",
          "emoji": "📚",
          "color": "#FFEDD5",
          "linkCTA": "View resources"
        },

        {
          "title": "Slashtags",
          "description": "Tools for building peer-to-peer applications, and data storage without the need of a blockchain!",
          "link": "https://bit.ly/bob-slashtags",
          "logo": "https://raw.githubusercontent.com/synonymdev/slashtags/master/docs/_img/slashtags_brand_mark.png",
          "color": "#F1F5F9",
          "linkCTA": "Learn about Slashtags"
        }
      ]
    },
    {
      "title": "3. Join the Discord",
      "description": "",

      "links": [
        {
          "title": "What is WebLN?",
          "description": "A guide that explains what is WebLN, and how it can be used to build lightning applications on the web.",
          "link": "https://webln.guide/",
          "emoji": "🤔",
          "color": "#FEFCE8",
          "linkCTA": "Visit Guide"
        },

        {
          "title": "Resources for developers",
          "description": "A compilation of great resources to learn how to build lightning applications on the web.",
          "link": "https://bolt.fun/story/list-of-resources-for-learning-webln--834",
          "emoji": "📚",
          "color": "#FFEDD5",
          "linkCTA": "View resources"
        },

        {
          "title": "WebLN Experiments",
          "description": "A web app that showcases the capabilities of WebLN, and how it can be used to build lightning applications on the web.",
          "link": "https://webln.twentyuno.net/",
          "emoji": "🧪",
          "color": "#F1F5F9",
          "linkCTA": "Play with it"
        }
      ]
    }
  ]
}

export default function App() {
  return (
    <BrowserRouter>
      <main
        className="relative isolate md:col-span-3 bg-white rounded
          grid grid-cols-[24px_1fr_24px] md:grid-cols-[80px_1fr_80px]
          max-md:-mx-16 py-80"
      >
        <div className="col-start-2 col-end-3 flex flex-col gap-y-[160px]">
          <div className="absolute w-full inset-x-0 top-0 -z-10">
            <img src="./bg.jpg" alt="" className="w-full" />{" "}
            <div className="bg-gradient-to-b from-transparent via-[#f8f8f863] to-40% absolute inset-0"></div>
          </div>
          <header className="relative md:py-80">
            <div className="flex flex-col gap-32 text-center items-center">
              <h1 className="text-h2 md:text-[55px] md:leading-[140%] text-primary-500 bg-gradient-to-r from-blue-500 to-violet-400 font-bolder bg-clip-text text-transparent inline-block">
                #Ai4ALL Hacker Checklist
              </h1>
              <p className="text-body2 font-medium mb-8 text-gray-800 drop-shadow-sm">
                Ai4ALL is a remote hackathon for building tools to democratize and scale generative AI using Bitcoin!

              </p>
              <div className="flex flex-wrap justify-center gap-20">
                <Button
                  href="https://bolt.fun/tournaments/ai4all"
                  color="none"
                  className="bg-gray-700 text-white px-32"
                >
                  Register for the Hackathon 🚀
                </Button>
                <Button
                  href="https://bolt.fun/story/write?tags=intros"
                  color="none"
                  className="bg-gray-700 text-white px-32"
                >
                  Introduce yourself 👋
                </Button>
              </div>

            </div>
          </header>
          {resourcesData.data.map((item) => (
            <section key={item.title} className="relative">
              <h2 className="text-h3 md:text-h2 text-center font-bolder mb-24">
                {item.title}
              </h2>
              <p className="text-body3 text-center">{item.description}</p>
              <ul className="flex flex-wrap justify-between gap-24 mt-64">
                {item.links.map((link) => (
                  <li key={link.title} className="basis-[240px] grow">
                    <a
                      href={link.link}
                      className="p-24 rounded h-full flex flex-col gap-8 hover:outline"
                      style={{
                        backgroundColor: link.color ?? "#F1F5F9",
                        outlineColor: `color-mix(in srgb, ${link.color} 80%, #292e41)`,
                      }}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Learn more about ${link.title}`}
                    >
                      {link.emoji && !link.logo && (
                        <p className="text-h3">{link.emoji}</p>
                      )}
                      {link.logo && (
                        <img
                          src={link.logo}
                          className="w-40 aspect-square rounded-8 object-cover"
                          alt=""
                        />
                      )}
                      <p className="text-body2 font-bolder text-gray-700">
                        {link.title}
                      </p>
                      <p className="text-gray-700">{link.description}</p>
                      <p className="text-gray-900 font-bolder flex items-center mt-auto">
                        {link.linkCTA ?? "Learn More"} <FaChevronRight />
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <section className="bg-gray-800 rounded-16 p-16 md:p-32 text-center  relative isolate">
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <img src="./confetti.png" alt="" />
              <div className="bg-gray-800 rounded-16 bg-opacity-40 absolute inset-0"></div>
            </div>
            <div className="flex flex-col gap-12 relative">
              <h2 className="text-body1 font-bolder bg-gradient-to-r from-blue-500 to-violet-400 bg-clip-text text-transparent ">
                Join the community
              </h2>
              <p className="text-body3 text-white">
                Proof of work starts with you. Share your work, build in public,
                win bounties and take part in hackathons and tournaments! Sign
                up and introduce yourself to the community.
              </p>
              <img
                src="./create-profile.png"
                alt=""
                className="self-center max-w-[300px]"
              />
              <Button
                href="https://bolt.fun/login"
                color="primary"
                className="self-center !px-64 -mt-40"
              >
                Sign up
              </Button>
              <p className="text-gray-200">
                And become a part of the most FUN developers community!
              </p>
            </div>
          </section>
        </div>
      </main>
    </BrowserRouter>
  );
}
