import { Box, Heading, Image, Img, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { PokemonContext } from '../../contexts/PokemonContext'
import pokeball from '../../assets/pokeballbg.png'
import { PokemonStatBar } from '../../components/PokemonStatBar'

export function PokemonDetailPage() {
  const { pokemons, renderBg, renderType, isLoading } =
    useContext(PokemonContext)
  const { name } = useParams()

  if (isLoading) {
    return
  }

  const pokemonDetail = pokemons.find((pokemon) => {
    if (pokemon.data.name === name) {
      return pokemon
    }
  })

  const totalBaseStats = pokemonDetail.data.stats.reduce((acc, stat) => {
    return (acc += stat.base_stat)
  }, 0)

  const getMoves = () => {
    let moves = []
    for (let i = 0; i < 4; i++) {
      moves.push(pokemonDetail.data.moves[i].move.name)
    }

    return moves
  }

  console.log(pokemonDetail)

  return (
    <main>
      <Box
        gap={'4rem'}
        px={{ lg: '4rem', md: '0', base: '0' }}
        mx={{ lg: '0', md: '1rem', base: '1rem' }}
        display={'flex'}
        flexDir={'column'}
        pt={'3.7rem'}
        h={'110vh'}
      >
        <Heading px={'1rem'}>Detalhes</Heading>
        <Box w={'full'}>
          <Box
            w={'full'}
            bg={renderBg(pokemonDetail.data)}
            px={{ lg: '2.75rem', md: '0', base: '0' }}
            py={'1.6rem'}
            rounded={'12px'}
            bgImage={pokeball}
            bgRepeat={'no-repeat'}
            bgPosition={'right'}
            bgSize={'40rem'}
            display={'flex'}
            gap={'3rem'}
            flexWrap={'wrap'}
            justifyContent={{ lg: 'start', md: 'center', base: 'center' }}
          >
            <Box
              display={{ lg: 'none', md: 'block', base: 'block' }}
              ml={'1rem'}
            >
              <Text>#{pokemonDetail.data.id}</Text>
              <Heading
                textTransform='capitalize'
                fontSize={'2rem'}
                fontWeight={'bold'}
                mb={'1rem'}
              >
                {pokemonDetail.data.name}
              </Heading>
              <Box display={'flex'} gap={'1'}>
                {/* First type badge (ex: "Bug"): */}
                <Img
                  src={renderType(pokemonDetail.data.types[0].type.name)}
                />
                {/* Second type badge (ex: "Poison") (if available):  */}
                {
                  pokemonDetail.data.types.length > 1 &&
                  <Img
                    src={renderType(pokemonDetail.data.types[1].type.name)}
                  />
                }
              </Box>
            </Box>
            <Image
              display={{ lg: 'none', md: 'block', base: 'block' }}
              h={{ lg: '0', md: '15rem', base: '10rem' }}
              src={pokemonDetail.data.sprites.other.dream_world.front_default}
            />

            <Box display={'flex'} flexDir={'column'} gap={'3rem'}>
              <Box
                display={'flex'}
                justifyContent={'center'}
                rounded={'12px'}
                bg={'white'}
                w={{ lg: '17rem', md: '15rem', base: '12rem' }}
                h={{ lg: '17rem', md: '15rem', base: '12rem' }}
              >
                <Img
                  w={{ lg: '10rem', md: '8rem', base: '6rem' }}
                  src={pokemonDetail.data.sprites.front_default}
                />
              </Box>
              <Box
                display={'flex'}
                justifyContent={'center'}
                rounded={'12px'}
                bg={'white'}
                w={{ lg: '17rem', md: '15rem', base: '12rem' }}
                h={{ lg: '17rem', md: '15rem', base: '12rem' }}
              >
                <Img
                  w={{ lg: 'rem', md: '8rem', base: '6rem' }}
                  src={pokemonDetail.data.sprites.back_default}
                />
              </Box>
            </Box>
            <Box
              p={'1rem'}
              bg={'white'}
              w={{ lg: '23rem', md: '18rem', base: '16rem' }}
              rounded={'12px'}
            >
              <Text
                fontWeight={'semibold'}
                fontSize={'1.4rem'}
                color={'black'}
                mb={'1rem'}
              >
                Base stats
              </Text>
              <Box borderTop={'1px'} borderColor={'gray.100'}>
                {pokemonDetail.data.stats.map((stat) => {
                  return (
                    <PokemonStatBar
                      key={stat.stat.name}
                      statName={stat.stat.name}
                      statValue={stat.base_stat}
                    />
                  )
                })}
                <PokemonStatBar statName={'total'} statValue={totalBaseStats} />
              </Box>
            </Box>
            <Box display={'flex'} flexDir={'column'} gap={'2.8rem'}>
              <Box display={'flex'} gap={'10rem'}>
                <Box
                  display={{ lg: 'block', md: 'none', base: 'none' }}
                  ml={'1rem'}
                >
                  <Text>#{pokemonDetail.data.id}</Text>
                  <Heading
                    textTransform='capitalize'
                    fontSize={'2rem'}
                    fontWeight={'bold'}
                    mb={'1rem'}
                  >
                    {pokemonDetail.data.name}
                  </Heading>
                  <Box display={'flex'} gap={'1'}>
                    {/* First type badge (ex: "Bug"): */}
                    <Img
                      src={renderType(pokemonDetail.data.types[0].type.name)}
                    />
                    {/* Second type badge (ex: "Poison") (if available):  */}
                    {
                      pokemonDetail.data.types.length > 1 &&
                      <Img
                        src={renderType(pokemonDetail.data.types[1].type.name)}
                      />
                    }
                  </Box>
                </Box>
                <Image
                  display={{ lg: 'block', md: 'none', base: 'none' }}
                  mt={'-5rem'}
                  h={`${name !== 'fearow' ? '17rem' : '8rem'}`}
                  src={
                    pokemonDetail.data.sprites.other.dream_world.front_default
                  }
                />
              </Box>
              <Box
                p={'1rem'}
                w={{ lg: '18rem', md: '18rem', base: '16rem' }}
                bg={'white'}
                h={'28rem'}
                rounded={'12px'}
              >
                <Text
                  fontWeight={'semibold'}
                  fontSize={'1.4rem'}
                  color={'black'}
                  mb={'1.25rem'}
                >
                  Moves:
                </Text>
                <Box
                  gap={'1.25rem'}
                  display={'flex'}
                  flexDir={'column'}
                  color={'black'}
                >
                  {getMoves().map((move) => {
                    return (
                      <Box
                        key={move}
                        border={'2px dotted'}
                        borderColor={'gray.300'}
                        rounded={'16px'}
                        p={'0.7rem'}
                        w={'fit-content'}
                        bg={'#ECECEC'}
                      >
                        <Text fontSize={'sm'} textTransform='capitalize'>
                          {move}
                        </Text>
                      </Box>
                    )
                  })}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </main>
  )
}
