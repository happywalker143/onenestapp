
import Counter from "../components/Counter";
import Container from "../components/calculator/Container";
import BMICalculator from "../components/calculator/health/BMICalculator"
const Contact = () => {
    return (
        <>
            <div className="flex p-2 justify-center flex-column">
                <Container>
                    <BMICalculator />
                </Container>
            </div>
        </>
    )
}

export default Contact;

