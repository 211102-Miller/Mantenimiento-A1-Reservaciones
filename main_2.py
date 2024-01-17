import sys
import vrplib
import random
import numpy as np


class ASParameters:
    def __init__(self, instance_file, solution_file, num_hormigas,
                 num_iterations, alpha, beta, rho):
        self.instance_file = instance_file
        self.solution_file = solution_file
        self.num_iterations = num_iterations
        self.num_hormigas = num_hormigas
        self.alpha = alpha
        self.beta = beta
        self.rho = rho


def initialize_arrays(params, instance):
    matriz_dist = np.array(instance['edge_weight'])
    dist_inv = np.zeros_like(matriz_dist, dtype=float)
    feromona = np.ones_like(matriz_dist, dtype=float)
    np.fill_diagonal(feromona, 0.0)
    mejorFO = float('inf')

    # NOTE: HORMIGAS ES LA MATRIZ QUE GUARDA CADA UNA DE LAS SOLUCIONES
    # hormigas = np.zeros(
    # (params.num_hormigas, instance['dimension']), dtype=int)
    # mejor_ruta = np.zeros(instance['dimension'], dtype=int)

    hormigas = np.zeros((params.num_hormigas, params.num_hormigas,
                         instance['dimension']), dtype=int)
    mejor_ruta = np.zeros((params.num_hormigas, instance['dimension']),
                          dtype=int)

    # NOTE: ARREGLO QUE GUARDA LA FUNCION OBJETIVO DE CADA UNO DE LAS HORMIGAS
    fohormigas = np.zeros(params.num_hormigas, dtype=float)

    return (matriz_dist, dist_inv, feromona, mejorFO, hormigas,
            mejor_ruta, fohormigas)


def calculate_dist_inv(matriz_dist):
    dimension = len(matriz_dist)
    dist_inv = np.zeros_like(matriz_dist, dtype=float)

    for i in range(dimension):
        for j in range(dimension):
            if i != j:
                dist_inv[i, j] = 1 / matriz_dist[i, j]

    return dist_inv


# fohormigas[k] = evaluaSolucion(
    # hormigas[k], matriz_dist, instance['dimension'])
def evaluaSolucion(hormigas, matriz_dist, n):
    valor_solucion = 0.0

    for i in range(n):
        if i < n - 1:
            valor_solucion += matriz_dist[hormigas[i], hormigas[i + 1]]
        else:
            valor_solucion += matriz_dist[hormigas[i], hormigas[0]]

    return valor_solucion


def calcularProba(probabilidad, probabilidad_acu, dist_inv, feromona, instance,
                  params, delta):
    dimension = instance['dimension']
    feromona = np.array(feromona) + np.array(delta)
    suma_inversa = np.sum(dist_inv, axis=1)
    suma_feromona = np.sum(feromona, axis=1)

    # calculamos la probabilidad para cada elemento, con base en la feromona y
    # la inversa de la distancia
    for i in range(dimension):
        for j in range(dimension):
            probabilidad[i, j] = (pow((1 - params.rho) * feromona[i, j],
                                      params.alpha) * pow(dist_inv[i, j],
                                                          params.beta)) / (
                suma_inversa[i] * suma_feromona[i])

    # ahora hacemos la suma para cada una de las ciudades y así sacar la proba
    # acumulada
    suma_acu = np.sum(probabilidad, axis=1)

    # generamos la probabilidad acumulada
    for i in range(dimension):
        for j in range(dimension):
            if suma_acu[i] == 0:
                # si la suma es cero, evitamos divisiones por cero
                probabilidad_acu[i, j] = 0.0
            else:
                if j == 0:
                    probabilidad_acu[i, j] = probabilidad[i, j] / suma_acu[i]
                else:
                    probabilidad_acu[i, j] = probabilidad_acu[i, j - 1] + (
                        probabilidad[i, j] / suma_acu[i])


"""def calcularProbaCiudades(probabilidad_acu, probabilidad, hormigas,
                          tamano_instancia, lista_tabu):
    suma_acu = np.zeros(tamano_instancia, dtype=float)

    for i in range(tamano_instancia):
        for j in range(tamano_instancia):
            if lista_tabu[i] == hormigas[j]:
                for k in range(tamano_instancia):
                    probabilidad[k, hormigas[j]] = 0.0

    # WARNING: Checar!!!
    # probabilidad[:, lista_tabu] = 0.0

    # Hacemos la suma para cada ciudad
    for i in range(tamano_instancia):
        for j in range(tamano_instancia):
            suma_acu[i] += probabilidad[i, j]

    # WARNING: Checar!!!
    # Hacemos la suma para cada ciudad
    # suma_acu = np.sum(probabilidad, axis=1)

    # generamos la probabilidad acumulada para la ruleta
    for i in range(tamano_instancia):
        for j in range(tamano_instancia):
            if j == 0:
                if probabilidad[i, j] == 0.0:
                    probabilidad_acu[i, j] = 0.0
                else:
                    probabilidad_acu[i, j] = probabilidad[i, j] / suma_acu[i]
            else:
                if probabilidad[i, j] == 0.0:
                    probabilidad_acu[i, j] = probabilidad_acu[i, j-1]
                else:
                    probabilidad_acu[i, j] = (
                        probabilidad_acu[i, j-1] + (probabilidad[i, j] /
                                                    suma_acu[i]))"""


# def anade(hormigas, lista_tabu, probabilidad, probabilidad_acu,
#           tamano_instancia, num_hormigas):
#     # TEST:
#     print("HORMIGAS en 'anade'")
#     print(hormigas)
#
#     hormigas_bidimensional = np.zeros_like(
#         np.tile(hormigas, (num_hormigas, 1)))
#     hormigas_bidimensional[0, :] = hormigas
#     print("\nHORMIGAS BIDIMENSIONAL en 'anade'")
#     print(hormigas_bidimensional)
#
#     # exit()
#
#     aleatorio = 0.0
#
#     for i in range(1, tamano_instancia):
#         aleatorio = random.random()
#
#         for j in range(tamano_instancia):
#             if j == 0:
#                 if aleatorio <= probabilidad_acu[hormigas[i - 1], j]:
#                     hormigas[i] = j
#                     lista_tabu[i] = j
#             else:
#                 if (aleatorio > probabilidad_acu[hormigas[i - 1], j - 1] and
#                         aleatorio <= probabilidad_acu[hormigas[i - 1], j]):
#                     hormigas[i] = j
#                     lista_tabu[i] = j
#
#         calcularProbaCiudades(probabilidad_acu, probabilidad,
#                               hormigas, tamano_instancia, lista_tabu)


# WARNING: CASI, LO LLENA A LO WEY XD

# def anade(hormigas, lista_tabu, probabilidad, probabilidad_acu,
#           tamano_instancia, num_hormigas):
#     # TEST:
#     print("HORMIGAS en 'anade'")
#     print(hormigas)
#     print("Lista tabú")
#     print(lista_tabu)
#
#     aleatorio = 0.0
#
#     for k in range(num_hormigas):  # Iterar sobre cada hormiga
#         for i in range(1, tamano_instancia):
#             aleatorio = random.random()
#
#             for j in range(tamano_instancia):
#                 if j == 0:
#                     if aleatorio <= probabilidad_acu[hormigas[k, i - 1], j]:
#                         hormigas[k, i] = j
#                         lista_tabu[k] = j
#                 else:
#                     if (aleatorio > probabilidad_acu[hormigas[k, i - 1], j - 1] and
#                             aleatorio <= probabilidad_acu[hormigas[k, i - 1], j]):
#                         hormigas[k, i] = j
#                         lista_tabu[k] = j
#
#             # calcularProbaCiudades(probabilidad_acu, probabilidad,
#                                   # hormigas[k], tamano_instancia, lista_tabu[k])
#
#     # TEST:
#     print("\nHORMIGAS después del bucle en 'anade'")
#     print(hormigas)
#     print("\nLista tabú")
#     print(lista_tabu)
#     exit()


def anade(hormigas, lista_tabu, probabilidad, probabilidad_acu,
          tamano_instancia, num_hormigas):
    # TEST:
    print("HORMIGAS en 'anade'")
    print(hormigas)
    print("lista tabú")
    print(lista_tabu)
    exit()


    hormigas_bidimensional = np.zeros_like(
        np.tile(hormigas, (num_hormigas, 1)))
    hormigas_bidimensional[0, :] = hormigas
    print("\nHORMIGAS BIDIMENSIONAL en 'anade'")
    print(hormigas_bidimensional)

    # exit()

    aleatorio = 0.0

    nums_disponibles = set(range(1, tamano_instancia + 1))
    nums_disponibles.remove(hormigas_bidimensional[0, 0])
    nums_disponibles = list(nums_disponibles)
    random.shuffle(nums_disponibles)

    # print(nums_disponibles)
    # x = nums_disponibles.pop()
    # print(x)
    # exit()

    for i in range(1, tamano_instancia):
        aleatorio = random.random()
        num_elegido = nums_disponibles.pop()

        for j in range(tamano_instancia):

            if j == 0:
                if aleatorio <= probabilidad_acu[hormigas[i - 1], j]:
                    # hormigas[i] = j
                    # hormigas_bidimensional[random.randint(0, 4), j] = j

                    fila_a_actualizar = random.randint(0, num_hormigas - 1)
                    columna_a_actualizar = np.where(
                        hormigas_bidimensional[fila_a_actualizar] == 0)[0][0]
                    hormigas_bidimensional[fila_a_actualizar,
                                           columna_a_actualizar] = num_elegido

                    # lista_tabu[i] = j
                    lista_tabu[i] = num_elegido
            else:
                if (aleatorio > probabilidad_acu[hormigas[i - 1], j - 1] and
                        aleatorio <= probabilidad_acu[hormigas[i - 1], j]):
                    # hormigas[i] = j
                    # hormigas_bidimensional[random.randint(0, 4), j] = j

                    fila_a_actualizar = random.randint(0, num_hormigas - 1)
                    columna_a_actualizar = np.where(
                        hormigas_bidimensional[fila_a_actualizar] == 0)[0][0]
                    hormigas_bidimensional[fila_a_actualizar,
                                           columna_a_actualizar] = num_elegido

                    # lista_tabu[i] = j
                    lista_tabu[i] = num_elegido

        calcularProbaCiudades(probabilidad_acu, probabilidad,
                              hormigas, tamano_instancia, lista_tabu)

    # TEST:
    print("\nHORMIGAS BIDIMENSIONAL después del bucle en 'anade'")
    print(hormigas_bidimensional)
    print("\nLista tabú")
    print(lista_tabu)
    exit()


def actualizaFero(dist_inv, feromona, tamano_instancia, delta, fohormigas,
                  ruta):
    for i in range(tamano_instancia):
        if i < tamano_instancia - 1:
            delta[ruta[i], ruta[i + 1]] += 1.0 / fohormigas
        else:
            delta[ruta[i], ruta[0]] += 1.0 / fohormigas


def AS(params):
    # TEST:
    borrar = 0

    # NOTE: Se preparan los datos =D
    instance = vrplib.read_instance(params.instance_file)
    solution = vrplib.read_solution(params.solution_file)

    (matriz_dist,
     dist_inv,
     feromona,
     mejorFO,
     hormigas,
     mejor_ruta,
     fohormigas
     ) = initialize_arrays(params, instance)
    dist_inv = calculate_dist_inv(matriz_dist)

    # probabilidad
    probabilidad = np.zeros((params.num_hormigas, instance['dimension'],
                             instance['dimension']), dtype=float)

    # probabilidad acumulada
    probabilidad_acu = np.zeros((params.num_hormigas, instance['dimension'],
                                 instance['dimension']), dtype=float)

    # delta (para actualizar la feromona)
    delta = np.zeros((params.num_hormigas, instance['dimension'],
                      instance['dimension']), dtype=float)

    # Lista tabu =D
    lista_tabu = np.zeros((params.num_hormigas, instance['dimension']),
                          dtype=int)

    # TODO: Código de la función completa xd
    for generacion in range(params.num_iterations):

        for k in range(params.num_hormigas):
            # para cada hormiga
            # calculamos la proba inicial
            # mandamos a cada elemento, ya no como arreglo tridimensional, sino
            # como arreglos bi-dimensionales
            calcularProba(probabilidad[k], probabilidad_acu[k],
                          dist_inv, feromona, instance, params, delta[k])
            hormigas[k, 0, 0] = random.randint(2, instance['dimension'] - 1)
            lista_tabu[k] = np.full(instance['dimension'], hormigas[k, 0, 0])

            # llamamos a la funcion que añade los elementos a la ruta
            # mandamos a cada elemento, ya no como arreglo tridimensional, sino
            # como arreglos bi-dimensionales
            anade(hormigas[k], lista_tabu[k], probabilidad[k],
                  probabilidad_acu[k], instance['dimension'],
                  params.num_hormigas)

            # imprimimos toda la ruta construída
            print(
                f"\nRuta CONSTRUIDA de la hormiga {k+1} en la generación: "
                f"{generacion+1}")
            print(" ".join(map(str, hormigas[k, :instance['dimension']])))

            # evaluamos cada hormiga (por eso mandamos de nuevo el elemento k)
            fohormigas[k] = evaluaSolucion(
                hormigas[k], matriz_dist, instance['dimension'])

            print(f"FO: {fohormigas[k]}")
            print("\n------------------------------------------------------\n")
            if fohormigas[k] < mejorFO:
                mejorFO = fohormigas[k]
                mejorRuta = hormigas[k, :instance['dimension']].copy()

            # en esta version actualizamos la feromona para cada hormiga en la
            # siguiente iteracion
            # la diferencia esta en el delta[k]
            actualizaFero(dist_inv, feromona, instance['dimension'], delta[k],
                          fohormigas[k], hormigas[k])

            # TEST:
            # print('\n\nPrueba')
            # print(hormigas)
            # return

        print('\nLa mejor ruta es:')
        for i in range(instance['dimension']):
            print(mejorRuta[i], end=" ")
        print(f"\nCon valor de FO: {mejorFO}")

        # TEST:
        print('\n\nTest')
        print(hormigas)
        if borrar == 0:
            print("Finalizó Test")
            return
        else:
            borrar += 1


if __name__ == "__main__":
    if len(sys.argv) != 8:
        print("Usage: python3 script_name.py instance_file solution_file "
              "num_hormigas num_iterations alpha beta rho")
    else:
        params = ASParameters(
            sys.argv[1],
            sys.argv[2],
            int(sys.argv[3]),
            int(sys.argv[4]),
            float(sys.argv[5]),
            float(sys.argv[6]),
            float(sys.argv[7])
        )

        AS(params)
