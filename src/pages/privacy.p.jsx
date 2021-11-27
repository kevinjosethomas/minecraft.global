import Default from "ui/layouts/Default";
import { GetDefaultData } from "api/core";
import { GetLoggedInUser } from "api/login";

export default function Privacy(props) {
  return (
    <Default user={props.user} defaultResults={props.defaultResults} search>
      <div className="flex flex-col items-start justify-start w-full space-y-10">
        <span className="font-bold text-6xl text-white text-opacity-80">Privacy Policy</span>

        <div className="flex flex-col items-start justify-center">
          <p className="tracking-wide text-white text-opacity-60">
            At minecraft.global, accessible from https://minecraft.global, one of our main
            priorities is the privacy of our visitors. This Privacy Policy document contains types
            of information that is collected and recorded by minecraft.global and how we use it.
          </p>
          <p className="tracking-wide text-white text-opacity-60">
            If you have additional questions or require more information about our Privacy Policy,
            do not hesitate to contact us.
          </p>
        </div>

        <div className="flex flex-col items-start justify-center">
          <h2 className="font-bold text-4xl text-white text-opacity-80">
            General Data Protection Regulation (GDPR)
          </h2>
          <p className="tracking-wide text-white text-opacity-60">
            We are a Data Controller of your information.
          </p>
          <p className="tracking-wide text-white text-opacity-60">
            minecraft.global legal basis for collecting and using the personal information described
            in this Privacy Policy depends on the Personal Information we collect and the specific
            context in which we collect the information:
          </p>
          <ol className="list-disc list-inside">
            <li className="tracking-wide text-white text-opacity-60">
              minecraft.global needs to perform a contract with you
            </li>
            <li className="tracking-wide text-white text-opacity-60">
              You have given minecraft.global permission to do so
            </li>
            <li className="tracking-wide text-white text-opacity-60">
              Processing your personal information is in minecraft.global legitimate interests
            </li>
            <li className="tracking-wide text-white text-opacity-60">
              minecraft.global needs to comply with the law
            </li>
          </ol>
          <p className="tracking-wide text-white text-opacity-60">
            minecraft.global will retain your personal information only for as long as is necessary
            for the purposes set out in this Privacy Policy. We will retain and use your information
            to the extent necessary to comply with our legal obligations, resolve disputes, and
            enforce our policies.
          </p>
          <p className="tracking-wide text-white text-opacity-60">
            If you are a resident of the European Economic Area (EEA), you have certain data
            protection rights. If you wish to be informed what Personal Information we hold about
            you and if you want it to be removed from our systems, please contact us.
          </p>
          <p className="tracking-wide text-white text-opacity-60">
            In certain circumstances, you have the following data protection rights:
          </p>
          <ol className="list-disc list-inside">
            <li className="tracking-wide text-white text-opacity-60">
              The right to access, update or to delete the information we have on you.
            </li>
            <li className="tracking-wide text-white text-opacity-60">
              The right of rectification.
            </li>
            <li className="tracking-wide text-white text-opacity-60">The right to object.</li>
            <li className="tracking-wide text-white text-opacity-60">The right of restriction.</li>
            <li className="tracking-wide text-white text-opacity-60">
              The right to data portability
            </li>
            <li className="tracking-wide text-white text-opacity-60">
              The right to withdraw consent
            </li>
          </ol>
        </div>

        <div className="flex flex-col items-start justify-center">
          <h2 className="font-bold text-4xl text-white text-opacity-80">Log Files</h2>
          <p className="tracking-wide text-white text-opacity-60">
            minecraft.global follows a standard procedure of using log files. These files log
            visitors when they visit websites. All hosting companies do this and a part of hosting
            services&apos; analytics. The information collected by log files include internet
            protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time
            stamp, referring/exit pages, and possibly the number of clicks. These are not linked to
            any information that is personally identifiable. The purpose of the information is for
            analyzing trends, administering the site, tracking users&apos; movement on the website,
            and gathering demographic information.
          </p>
        </div>

        <div className="flex flex-col items-start justify-center">
          <h2 className="font-bold text-4xl text-white text-opacity-80">Cookies and Web Beacons</h2>
          <p className="tracking-wide text-white text-opacity-60">
            Like any other website, minecraft.global uses &apos;cookies&apos;. These cookies are
            used to store information including visitors&apos; preferences, and the pages on the
            website that the visitor accessed or visited. The information is used to optimize the
            users&apos; experience by customizing our web page content based on visitors&apos;
            browser type and/or other information.
          </p>
          <p className="tracking-wide text-white text-opacity-60">
            For more general information on cookies, please read{" "}
            <a href="https://www.privacypolicyonline.com/what-are-cookies/">
              &quot;What Are Cookies&quot;
            </a>
            .
          </p>
        </div>

        <div className="flex flex-col items-start justify-center">
          <h2 className="font-bold text-4xl text-white text-opacity-80">
            Our Advertising Partners
          </h2>
          <p className="tracking-wide text-white text-opacity-60">
            Some advertisers on our site may use cookies and web beacons. Our advertising partners
            are listed below. Each of our advertising partners have their own Privacy Policy for
            their policies on user data. For easier access, we hyperlinked to their Privacy Policies
            below.
          </p>
          <ol className="list-disc list-inside">
            <li className="tracking-wide text-white text-opacity-60 format-links">
              Google:{" "}
              <a href="https://policies.google.com/technologies/ads">
                https://policies.google.com/technologies/ads
              </a>
            </li>
          </ol>
        </div>

        <div className="flex flex-col items-start justify-center">
          <h2 className="font-bold text-4xl text-white text-opacity-80">Privacy Policies</h2>
          <p className="tracking-wide text-white text-opacity-60">
            You may consult this list to find the Privacy Policy for each of the advertising
            partners of minecraft.global.
          </p>
          <p className="tracking-wide text-white text-opacity-60">
            Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web
            Beacons that are used in their respective advertisements and links that appear on
            minecraft.global, which are sent directly to users&apos; browsers. They automatically
            receive your IP address when this occurs. These technologies are used to measure the
            effectiveness of their advertising campaigns and/or to personalize the advertising
            content that you see on websites that you visit.
          </p>
          <p className="tracking-wide text-white text-opacity-60">
            Note that minecraft.global has no access to or control over these cookies that are used
            by third-party advertisers.
          </p>
        </div>

        <div className="flex flex-col items-start justify-center">
          <h2 className="font-bold text-4xl text-white text-opacity-80">
            Third Party Privacy Policies
          </h2>
          <p className="tracking-wide text-white text-opacity-60">
            minecraft.global&apos;s Privacy Policy does not apply to other advertisers or websites.
            Thus, we are advising you to consult the respective Privacy Policies of these
            third-party ad servers for more detailed information. It may include their practices and
            instructions about how to opt-out of certain options.{" "}
          </p>
          <p className="tracking-wide text-white text-opacity-60">
            You can choose to disable cookies through your individual browser options. To know more
            detailed information about cookie management with specific web browsers, it can be found
            at the browsers&apos; respective websites.
          </p>
        </div>

        <div className="flex flex-col items-start justify-center">
          <h2 className="font-bold text-4xl text-white text-opacity-80">
            Children&apos;s Information
          </h2>
          <p className="tracking-wide text-white text-opacity-60">
            Another part of our priority is adding protection for children while using the internet.
            We encourage parents and guardians to observe, participate in, and/or monitor and guide
            their online activity.
          </p>
          <p className="tracking-wide text-white text-opacity-60">
            minecraft.global does not knowingly collect any Personal Identifiable Information from
            children under the age of 13. If you think that your child provided this kind of
            information on our website, we strongly encourage you to contact us immediately and we
            will do our best efforts to promptly remove such information from our records.
          </p>
        </div>

        <div className="flex flex-col items-start justify-center">
          <h2 className="font-bold text-4xl text-white text-opacity-80">
            Online Privacy Policy Only
          </h2>
          <p className="tracking-wide text-white text-opacity-60">
            Our Privacy Policy created at GDPRPrivacyPolicy.net) applies only to our online
            activities and is valid for visitors to our website with regards to the information that
            they shared and/or collect in minecraft.global. This policy is not applicable to any
            information collected offline or via channels other than this website.
          </p>
        </div>

        <div className="flex flex-col items-start justify-center">
          <h2 className="font-bold text-4xl text-white text-opacity-80">Consent</h2>
          <p className="tracking-wide text-white text-opacity-60">
            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
          </p>
        </div>
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const [user, data] = await Promise.all([GetLoggedInUser(ctx), GetDefaultData(ctx)]);

    if (data[1]) {
      return {
        props: {
          error: data[1].response?.status || 500,
        },
      };
    }

    if (user[1]) {
      return {
        props: {
          defaultResults: data[0],
        },
      };
    } else {
      return {
        props: {
          user: user[0],
          defaultResults: data[0],
        },
      };
    }
  } catch (e) {
    console.log(e);
    return {
      props: {
        error: 500,
      },
    };
  }
}
