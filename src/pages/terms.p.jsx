import Link from "next/link";

import Default from "ui/layouts/Default";
import { GetDefaultData } from "api/core";
import { GetLoggedInUser } from "api/login";

export default function Terms(props) {
  return (
    <Default user={props.user} defaultResults={props.defaultResults} search>
      <div className="flex flex-col items-start justify-start w-full space-y-10">
        <h1 className="font-bold text-6xl text-white text-opacity-80">Terms of Service</h1>
        <div className="flex flex-col items-start justify-center">
          <h2 className="font-bold text-4xl text-white text-opacity-80">1. Terms</h2>
          <p className="tracking-wide text-white text-opacity-60">
            By accessing this Website, accessible from https://minecraft.global, you are agreeing to
            be bound by these Website Terms and Conditions of Use and agree that you are responsible
            for the agreement with any applicable local laws. If you disagree with any of these
            terms, you are prohibited from accessing this site. The materials contained in this
            Website are protected by copyright and trade mark law.
          </p>
        </div>

        <div className="flex flex-col items-start justify-center">
          <h2 className="font-bold text-4xl text-white text-opacity-80">2. Use License</h2>
          <p className="tracking-wide text-white text-opacity-60">
            Permission is granted to temporarily download one copy of the materials on
            minecraft.global&apos;s Website for personal, non-commercial transitory viewing only.
            This is the grant of a license, not a transfer of title, and under this license you may
            not:
          </p>
          <ol className="list-disc list-inside">
            <li className="tracking-wide text-white text-opacity-60">
              modify or copy the materials;
            </li>
            <li className="tracking-wide text-white text-opacity-60">
              use the materials for any commercial purpose or for any public display;
            </li>
            <li className="tracking-wide text-white text-opacity-60">
              attempt to reverse engineer any software contained on minecraft.global&apos;s Website;
            </li>
            <li className="tracking-wide text-white text-opacity-60">
              remove any copyright or other proprietary notations from the materials; or
            </li>
            <li className="tracking-wide text-white text-opacity-60">
              transferring the materials to another person or &quot;mirror&quot; the materials on
              any other server.
            </li>
          </ol>
          <p className="tracking-wide text-white text-opacity-60">
            This will let minecraft.global to terminate upon violations of any of these
            restrictions. Upon termination, your viewing right will also be terminated and you
            should destroy any downloaded materials in your possession whether it is printed or
            electronic format. These Terms of Service has been created with the help of the{" "}
            <a href="https://www.termsofservicegenerator.net">Terms Of Service Generator</a>.
          </p>
        </div>

        <div className="flex flex-col items-start justify-center">
          <h2 className="font-bold text-4xl text-white text-opacity-80">3. Disclaimer</h2>
          <p className="tracking-wide text-white text-opacity-60">
            All the materials on minecraft.global’s Website are provided &quot;as is&quot;.
            minecraft.global makes no warranties, may it be expressed or implied, therefore negates
            all other warranties. Furthermore, minecraft.global does not make any representations
            concerning the accuracy or reliability of the use of the materials on its Website or
            otherwise relating to such materials or any sites linked to this Website.
          </p>
        </div>

        <div className="flex flex-col items-start justify-center">
          <h2 className="font-bold text-4xl text-white text-opacity-80">4. Limitations</h2>
          <p className="tracking-wide text-white text-opacity-60">
            minecraft.global or its suppliers will not be hold accountable for any damages that will
            arise with the use or inability to use the materials on minecraft.global’s Website, even
            if minecraft.global or an authorize representative of this Website has been notified,
            orally or written, of the possibility of such damage. Some jurisdiction does not allow
            limitations on implied warranties or limitations of liability for incidental damages,
            these limitations may not apply to you.
          </p>
        </div>

        <div className="flex flex-col items-start justify-center">
          <h2 className="font-bold text-4xl text-white text-opacity-80">5. Revisions and Errata</h2>
          <p className="tracking-wide text-white text-opacity-60">
            The materials appearing on minecraft.global’s Website may include technical,
            typographical, or photographic errors. minecraft.global will not promise that any of the
            materials in this Website are accurate, complete, or current. minecraft.global may
            change the materials contained on its Website at any time without notice.
            minecraft.global does not make any commitment to update the materials.
          </p>
        </div>

        <div className="flex flex-col items-start justify-center">
          <h2 className="font-bold text-4xl text-white text-opacity-80">6. Links</h2>
          <p className="tracking-wide text-white text-opacity-60">
            minecraft.global has not reviewed all of the sites linked to its Website and is not
            responsible for the contents of any such linked site. The presence of any link does not
            imply endorsement by minecraft.global of the site. The use of any linked website is at
            the user’s own risk.
          </p>
        </div>

        <div className="flex flex-col items-start justify-center">
          <h2 className="font-bold text-4xl text-white text-opacity-80">
            7. Site Terms of Use Modifications
          </h2>
          <p className="tracking-wide text-white text-opacity-60">
            minecraft.global may revise these Terms of Use for its Website at any time without prior
            notice. By using this Website, you are agreeing to be bound by the current version of
            these Terms and Conditions of Use.
          </p>
        </div>

        <div className="flex flex-col items-start justify-center">
          <h2 className="font-bold text-4xl text-white text-opacity-80">8. Your Privacy</h2>
          <p className="tracking-wide text-white text-opacity-60 format-links">
            Please read our{" "}
            <Link href="/privacy">
              <a>Privacy Policy</a>
            </Link>
            .
          </p>
        </div>

        <div className="flex flex-col items-start justify-center">
          <h2 className="font-bold text-4xl text-white text-opacity-80">9. Governing Law</h2>
          <p className="tracking-wide text-white text-opacity-60">
            Any claim related to minecraft.global&apos;s Website shall be governed by the laws of ca
            without regards to its conflict of law provisions.
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
