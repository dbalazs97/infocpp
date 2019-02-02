import React from 'react';
import {PageHeader, PageTitle, Syntax} from '../StyleComponents';
import {Container} from 'semantic-ui-react-single/Container';

export default function IndexPage() {
	return (
		<Container>
			<PageTitle text='InfoC++2 :: Főoldal'/>
			<PageHeader icon='code'>Üdv az InfoC++2 oldalán!</PageHeader>
			<p>Ez az oldal a BMEVIIIAA03 tárgyhoz készült a C++ programozás tanulásának elősegítéséhez.</p>

			<p>Az oldalon olyan tananyagok találhatóak, melyek a C nyelv és a programozás alapvető ismeretire építenek.</p>

			<Syntax>
				{`std::string InfoCpp2::getMenu(std::string menu) {\n\tif(menu == "Info") return "Követelmények, aktualitások";\n\tif(menu == "Tananyag") return "Témakörökre bontott kiegészítő tananyag";\n\tif(menu == "Extrák") return "Függelék, érdekességek, HFTest használata";\n\tif(menu == "Kapcsolat") return "Az oldal készítője, copyright, elérhetőség";\n\treturn "Valami más";\n}`}
			</Syntax>

			<p>Az oldalon található kódrészletek szabadon felhasználhatóak, továbbfejleszthetőek.</p>
		</Container>
	);
};
