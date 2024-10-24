import Features from "@/components/landingpage/features"
import Hero from "@/components/landingpage/hero"
import Perks from "@/components/landingpage/perks"
import WorkFlow from "@/components/landingpage/workflow"

export default function Home () {
    return (
        <div className="lg:mx-16 mx-5">
            <Hero/>
            <Perks/>
            <Features/>
            <WorkFlow/>
        </div>
    )
}