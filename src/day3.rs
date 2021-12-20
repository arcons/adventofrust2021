use std::fs::File;
use std::io::BufReader;
use std::io::BufRead;

fn main() {

    let contents = load_from_file("./inputs/test.txt");
    // let part_1_answer =  part1(contents);
    // println!("Part 1 {}", part_1_answer);
    let part_2_answer =  part2(contents);
    println!("Part 2 {}", part_2_answer);
}

fn part1(input: Vec<Vec<char>>) -> i32 {
  let mut gamma: Vec<char> = vec![];
  let mut epsilon: Vec<char> = vec![];
  // let all_bin = input.len();
  for y in 0..input[0].len() {
    let mut zero_count = 0;
    let mut one_count = 0;

    for x in 0..input.len() {
      let current = input[x][y];
      if current == '0' {
        zero_count+=1;
      }
      else if current == '1' {
        one_count+=1;
      }
    }
    if zero_count > one_count {
      gamma.push('0');
      epsilon.push('1');
    } else {
      gamma.push('1');
      epsilon.push('0');
    }

  }
  let g: String = gamma.into_iter().collect();
  let e: String = epsilon.into_iter().collect();
  println!("gamma {}", g);
  println!("epsil {}", e);
  let gamma_val = isize::from_str_radix(&g, 2).unwrap();
  let epsilon_val = isize::from_str_radix(&e, 2).unwrap();
  println!("gamma val {}", gamma_val);
  println!("epsil val {}", epsilon_val);
  return (gamma_val * epsilon_val).try_into().unwrap()
  // return -1
}



fn part2(input: Vec<Vec<char>>) -> i32 {
  let mut oxygen: Vec<i32> = vec![];
  let mut carbon: Vec<i32> = vec![];

  let mut keep: Vec<i32> = vec![];
  // let all_bin = input.len();
  keep = input[y].clone()
  while keep.len() != 1 {

    for y in 0..input[0].len() {
      
    let mut gamma: Vec<i32> = vec![];
    let mut epsilon: Vec<i32> = vec![];

      let mut zero_count = 0;
      let mut one_count = 0;

      for x in 0..input.len() {
        let current = input[x][y];
        if current == '0' {
          zero_count+=1;
          gamma.push(x)
        }
        else if current == '1' {
          one_count+=1;
          epsilon.push(x)
        }
      }
    }
  }


  // let g: String = gamma.into_iter().collect();
  // let e: String = epsilon.into_iter().collect();
  // println!("gamma {}", g);
  // println!("epsil {}", e);
  // let gamma_val = isize::from_str_radix(&g, 2).unwrap();
  // let epsilon_val = isize::from_str_radix(&e, 2).unwrap();
  // println!("gamma val {}", gamma_val);
  // println!("epsil val {}", epsilon_val);
  // return (gamma_val * epsilon_val).try_into().unwrap()
  return -1
}

fn load_from_file(file_path: &str) -> Vec<Vec<char>> {
  let file = File::open(file_path).expect("file wasn't found.");
  let reader = BufReader::new(file);

  let lines: Vec<String> = reader
      .lines()
      .map(|line| line.expect("Could not parse line"))
      .collect();

  let mut commands = Vec::new();
    for line in lines {
      let char_vec: Vec<char> = line.chars().collect();
      commands.push(char_vec)
    }
    return commands;
}