import React from "react";
import Divider from "../../Components/shared/Divider";

function Services() {
  return (
    <div>
      <h2 className="font-bold text-center text-xl md:text-2xl lg:text-3xl pt-10 lg:pt-20">
        Other services
      </h2>
      <Divider />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* service 1 */}
        <div className="rounded-sm bg-white p-4 ring-3 ring-indigo-50 sm:p-6 lg:p-8">
          <div>
            <strong className="rounded-sm border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
              Web
            </strong>

            <h3 className="mt-4 text-lg font-medium sm:text-xl">
              Custom Web Development
            </h3>

            <p className="mt-1 text-sm text-gray-700">
              Elevate your online presence with our Custom Web Development
              service. We build tailored, responsive websites using modern
              frameworks, ensuring robust performance, high security, and
              seamless user experience to drive business growth and
              engagement.!!!
            </p>
          </div>
        </div>
        {/* //service 2 */}
        <div className="rounded-sm bg-white p-4 ring-3 ring-indigo-50 sm:p-6 lg:p-8">
          <div>
            <strong className="rounded-sm border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
              Web
            </strong>

            <h3 className="mt-4 text-lg font-medium sm:text-xl">
              Responsive Theme Development
            </h3>

            <p className="mt-1 text-sm text-gray-700">
              Experience stunning visuals and flawless usability with our
              Responsive Web Design service. We create adaptive, mobile-friendly
              layouts that captivate users across devices. Our designs blend
              style and function to deliver vivid digital experiences.!!!!
            </p>
          </div>
        </div>
        {/* //service 3 */}
        <div className="rounded-sm bg-white p-4 ring-3 ring-indigo-50 sm:p-6 lg:p-8">
          <div>
            <strong className="rounded-sm border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
              Graphic
            </strong>

            <h3 className="mt-4 text-lg font-medium sm:text-xl">
              Graphic Branding Solutions
            </h3>

            <p className="mt-1 text-sm text-gray-700">
              Revitalize your brand identity with our Graphic Branding
              Solutions. Our experts craft logos, dynamic marketing collateral,
              and unified visuals that capture your brand essence with bold
              impact! Our team brings your vision to life with striking
              creativity.!!!!
            </p>
          </div>
        </div>
        {/* //service 4 */}
        <div className="rounded-sm bg-white p-4 ring-3 ring-indigo-50 sm:p-6 lg:p-8">
          <div>
            <strong className="rounded-sm border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
              SEO
            </strong>

            <h3 className="mt-4 text-lg font-medium sm:text-xl">
              Advanced SEO Optimization
            </h3>

            <p className="mt-1 text-sm text-gray-700">
              Boost your online visibility with our Advanced SEO Optimization
              service. We deliver targeted keyword research, on-page tuning, and
              backlink building to boost your search ranking. Our SEO experts
              drive results boosting organic traffic and rankings now.
            </p>
          </div>
        </div>
        {/* //service 5 */}
        <div className="rounded-sm bg-white p-4 ring-3 ring-indigo-50 sm:p-6 lg:p-8">
          <div>
            <strong className="rounded-sm border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
              Marketing
            </strong>

            <h3 className="mt-4 text-lg font-medium sm:text-xl">
              Digital Marketing Strategy
            </h3>

            <p className="mt-1 text-sm text-gray-700">
              Maximize your online impact with our Digital Marketing Strategy
              service. We develop integrated campaigns across multiple channels,
              leveraging data insights and creative tactics to engage audiences
              and drive measurable growth for your brand.!!! NOW!!
            </p>
          </div>
        </div>
        {/* //service 6 */}
        <div className="rounded-sm bg-white p-4 ring-3 ring-indigo-50 sm:p-6 lg:p-8">
          <div>
            <strong className="rounded-sm border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
              Marketing
            </strong>

            <h3 className="mt-4 text-lg font-medium sm:text-xl">
              Content & Social Media Management
            </h3>

            <p className="mt-1 text-sm text-gray-700">
              Enhance your brand’s narrative with our Content & Social Media
              Management service. We craft compelling content and manage vibrant
              social channels to foster engagement, build community, and elevate
              your online reputation with creative storytelling.!!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
