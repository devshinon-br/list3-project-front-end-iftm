const calculateAVG = (estudantes) => {
    const notas = estudantes.map(estudante => (estudante.notaBim1 + estudante.notaBim2) / 2);
    const media = notas.reduce((acc, curr) => acc + curr, 0) / notas.length;
    return media.toFixed(2);
}

async function getStudentsData() {
    const response = await fetch('https://wilton-filho.github.io/PFJS-GitHub/bases/alunos.json');
    const data = await response.json();
    return data;
}

async function showResults() {
    const opcao = document.getElementById('opcoes').value;
    const estudantes = await getStudentsData();
    const resultadoDiv = document.getElementById('resultado');
    let resultadoHTML = '';

    switch (opcao) {
        case 'todos':
            estudantes.forEach(estudante => {
                resultadoHTML += `${estudante.nome}: ${estudante.notaBim1} (bimestre 1) e ${estudante.notaBim2} (bimestre 2) = ${estudante.notaBim1 + estudante.notaBim2}<br>`;
            });
            break;
        case 'homens':
            estudantes.filter(estudante => estudante.sexo === 'M').forEach(estudante => {
                resultadoHTML += `${estudante.nome}: ${estudante.notaBim1} (bimestre 1) e ${estudante.notaBim2} (bimestre 2) = ${estudante.notaBim1 + estudante.notaBim2}<br>`;
            });
            break;
        case 'mulheres':
            estudantes.filter(estudante => estudante.sexo === 'F').forEach(estudante => {
                resultadoHTML += `${estudante.nome}: ${estudante.notaBim1} (bimestre 1) e ${estudante.notaBim2} (bimestre 2) = ${estudante.notaBim1 + estudante.notaBim2}<br>`;
            });
            break;
        case 'aprovados':
            estudantes.filter(estudante => (estudante.notaBim1 + estudante.notaBim2) >= 60).forEach(estudante => {
                resultadoHTML += `${estudante.nome}: ${estudante.notaBim1} (bimestre 1) e ${estudante.notaBim2} (bimestre 2) = ${estudante.notaBim1 + estudante.notaBim2}<br>`;
            });
            break;
        case 'reprovados':
            estudantes.filter(estudante => (estudante.notaBim1 + estudante.notaBim2) < 60).forEach(estudante => {
                resultadoHTML += `${estudante.nome}: ${estudante.notaBim1} (bimestre 1) e ${estudante.notaBim2} (bimestre 2) = ${estudante.notaBim1 + estudante.notaBim2}<br>`;
            });
            break;
        case 'media':
            resultadoHTML = `Nota média = ${calculateAVG(estudantes)}`;
            break;
        default:
            resultadoHTML = 'Selecione uma opção válida.';
    }

    resultadoDiv.innerHTML = resultadoHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('opcoes').addEventListener('change', showResults);
})



